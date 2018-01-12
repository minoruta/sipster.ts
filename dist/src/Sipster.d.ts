/// <reference types="node" />
import { EventEmitter } from 'events';
/** @see {@link http://www.pjsip.org/pjsip/docs/html/structpj_1_1LogConfig.htm|LogConfig} */
export interface LogConfig {
    level: number;
    consoleLevel: number;
}
/** @see {@link http://www.pjsip.org/pjsip/docs/html/structpj_1_1EpConfig.htm|EpConfig} */
export interface EpConfig {
    logConfig: LogConfig;
}
/** @see {@link http://www.pjsip.org/pjsip/docs/html/structpj_1_1TlsConfig.htm|TlsConfig} */
export interface TlsConfig {
    CaListFile: string;
    certFile: string;
    privKeyFile: string;
}
/** @see {@link http://www.pjsip.org/pjsip/docs/html/structpj_1_1TransportConfig.htm|TransportConfig} */
export interface TransportConfig {
    port: number;
    protocol?: string;
    tlsConfig?: TlsConfig;
}
/** @see {@link http://www.pjsip.org/pjsip/docs/html/structpj_1_1AccountRegConfig.htm|RegConfig} */
export interface RegConfig {
    registrarUri: string;
    contactParams?: string;
    timeoutSec?: number;
    retryIntervalSec?: number;
    firstRetryIntervalSec?: number;
    randomRetryIntervalSec?: number;
    delayBeforeRefreshSec?: number;
    dropCallsOnFail?: boolean;
    unregWaitMsec?: number;
    proxyUse?: number;
}
/** @see {@link http://www.pjsip.org/pjsip/docs/html/structpjsip__cred__info.htm|AuthCred} */
export interface AuthCred {
    scheme: string;
    realm: string;
    username: string;
    dataType: number;
    data: string;
}
/** @see {@link http://www.pjsip.org/pjsip/docs/html/structpj_1_1AccountSipConfig.htm|SipConfig} */
export interface SipConfig {
    authCreds: AuthCred[];
    transportId?: number;
}
/** @see {@link http://www.pjsip.org/pjsip/docs/html/structpj_1_1AccountConfig.htm|AccountConfig} */
export interface AccountConfig {
    priority?: number;
    idUri: string;
    regConfig?: RegConfig;
    sipConfig?: SipConfig;
}
export declare const DEFAULT_ACCOUNT_CONFIG: {
    priority: number;
    regConfig: {
        registerOnAdd: boolean;
        contactParams: string;
        timeoutSec: number;
        retryIntervalSec: number;
        firstRetryIntervalSec: number;
        randomRetryIntervalSec: number;
        delayBeforeRefreshSec: number;
        dropCallsOnFail: boolean;
        unregWaitMsec: number;
        proxyUse: number;
    };
    sipConfig: {
        transportId: number;
    };
};
/** @see {@link http://www.pjsip.org/pjsip/docs/html/classpj_1_1Call.htm|Call} */
export declare class Call extends EventEmitter {
    /** Detaches the Call from the event loop (default). */
    unref(): void;
    /** Attaches the Call to the event loop. */
    ref(): void;
    /**
     * For incoming calls, this responds to the INVITE with an optional
     * statusCode (defaults to 200) and optional reason phrase.
     */
    answer(statusCode?: number, reason?: string): void;
    /**
     * Hangs up the call with an optional statusCode (defaults to 603)
     * and optional reason phrase. This function is different than answering
     * the call with 3xx-6xx response (with answer()), in that this function
     * will hangup the call regardless of the state and role of the call,
     * while answer() only works with incoming calls on EARLY state.
     */
    hangup(statusCode?: number, reason?: string): void;
    /** Puts the call on hold. */
    hold(): void;
    /** Releases a hold. */
    reinvite(): void;
    /** Sends an UPDATE request. */
    update(): void;
    /** Transfers the call to destination. */
    transfer(destination: string): void;
    /** Sends DTMF digits to the remote end using the RFC 2833 payload format. */
    dtmf(digits: string): void;
    /**
     * Returns formatted statistics about the call.
     * If inclMediaStats is true, then statistics about the Call's media is
     * included (default is true).
     * indent is the string to use for indenting (default is two spaces).
     */
    getStatsDump(inclMediaStats?: boolean, indent?: string): string;
    /** Call connected duration in seconds (zero when call is not established). */
    readonly connDuration: number;
    /** Total call duration in seconds, including set-up time. */
    readonly totalDuration: number;
    /** True if the Call has active media. */
    readonly hasMedia: boolean;
    /** True if the call has an active INVITE session and the INVITE session has not been disconnected. */
    readonly isActive: boolean;
}
export interface TransportInfo {
    /** Transport type name. */
    type: string;
    /** Transport string info/description. */
    info: string;
    /** Transport flags (e.g. PJSIP_TRANSPORT_RELIABLE, PJSIP_TRANSPORT_SECURE, PJSIP_TRANSPORT_DATAGRAM). */
    flags: number;
    /** Local/bound address. */
    localAddress: string;
    /** Published address. */
    localName: string;
    /** Current number of objects currently referencing this transport. */
    usageCount: number;
}
export interface AccountInfo {
    /** The account's URI. */
    uri: string;
    /** Flag to tell whether this account has registration setting (reg_uri is not empty). */
    regIsConfigured: boolean;
    /** Flag to tell whether this account is currently registered (has active registration session). */
    regIsActive: boolean;
    /** An up to date expiration interval for account registration session. */
    regExpiresSec: number;
}
export interface CallInfo {
    /** The ip (and port) of the request. */
    srcAddress: string;
    /** Local SIP URI. */
    localUri: string;
    /** Local Contact field. */
    localContact: string;
    /** Remote SIP URI. */
    remoteUri: string;
    /** Remote Contact field. */
    remoteContact: string;
    /** The Call-ID field. */
    callId: string;
}
/** @see {@link http://www.pjsip.org/pjsip/docs/html/structpjsip__transport.htm|Transport} */
export declare class Transport extends EventEmitter {
    /**
     * Creates and returns a new, enabled Transport instance.
     * {@link http://www.pjsip.org/pjsip/docs/html/structpj_1_1TransportConfig.htm|transportConfig}
     * is a TransportConfig-like object for if you need to change any transport
     * options from the library defaults.
     */
    constructor(config: TransportConfig);
    /** Detaches the Transport from the event loop. */
    unref(): void;
    /** Attaches the Transport to the event loop (default upon instantiation). */
    ref(): void;
    /** Returns information (TransportInfo) about the transport */
    getInfo(): TransportInfo;
    /**
     * Disables the transport.
     * Disabling a transport does not necessarily close the socket,
     * it will only discard incoming messages and prevent the transport
     * from being used to send outgoing messages.
     */
    disable(): void;
    /**
     * Enables the transport.
     * Transports are automatically enabled upon creation,
     * so you don't need to call this method
     * unless you explicitly disable the transport first.
     */
    enable(): void;
    /** Indicates if the transport is currently enabled or not. */
    readonly enabled: boolean;
}
/** @see {@link http://www.pjsip.org/pjsip/docs/html/classpj_1_1Account.htm|Account} */
export declare class Account extends EventEmitter {
    constructor(config: AccountConfig);
    /** Detaches the Account from the event loop. */
    unref(): void;
    /** Attaches the Account to the event loop (default upon instantiation). */
    ref(): void;
    /** Returns information (AccountConfig) about the account */
    getInfo(): AccountInfo;
    /**
     * Update registration or perform unregistration.
     * You only need to call this method if you want to manually update the
     * registration or want to unregister from the server.
     * If renew is false, this will begin the unregistration process.
     */
    setRegistration(renew: boolean): void;
    /**
     * Lock/bind the given transport to this account.
     * Normally you shouldn't need to do this, as transports will be selected
     * automatically by the library according to the destination.
     * When an account is locked/bound to a specific transport, all outgoing
     * requests from this account will use the specified transport (this
     * includes SIP registration, dialog (call and event subscription),
     * and out-of-dialog requests such as MESSAGE).
     */
    setTransport(transport: Transport): void;
    /**  Start a new SIP call to destination. */
    makeCall(destination: string): Call;
    /** Is the Account still valid? */
    readonly valid: boolean;
    /** Is this the default Account for when no other Account matches a request? */
    default: boolean;
}
/** @see {@link http://www.pjsip.org/pjsip/docs/html/classpj_1_1Media.htm|Media} */
export declare class Media {
    /**
     * Immediately closes the Media. This can be useful to do explicitly
     * since v8's garbage collector is quite lazy. After calling this,
     * using this particular Media instance (and its methods) is useless.
     */
    close(): void;
}
/**
 * eof event.
 * This is only applicable to player or playlist Media objects and indicates
 * that the end of the file or end of playlist has been reached.
 * @event AudioMedia#eof
 */
/** @see {@link http://www.pjsip.org/pjsip/docs/html/classpj_1_1AudioMedia.htm|AudioMedia} */
export declare class AudioMedia extends Media {
    /**
     * Starts transmitting to sink.
     * @fires AudioMedia#eof
     */
    startTransmitTo(sink: Media): void;
    /** Stops transmitting to sink. */
    stopTransmitTo(sink: Media): void;
    /**
     * Adjust the signal level of the audio sent from this Media by making it
     * louder or quieter: a val of 1.0 means no level adjustment
     * and a val of 0 means to mute.
     */
    adjustTxLevel(val: number): void;
    /**
     * Adjust the signal level of the audio sent to this Media by making it
     * louder or quieter: a val of 1.0 means no level adjustment
     * and a val of 0 means to mute.
     */
    adjustRxLevel(val: number): void;
    /**
     * Returns the direction of the media from our perspective.
     * The value is one of: 'none', 'inbound', 'outbound', 'bidirectional', or 'unknown'.
     */
    readonly dir: string;
    /** Returns the remote address (and port) of where the RTP originates. */
    readonly rtpAddr: string;
    /** Returns the remote address (and port) of where the RTCP originates. */
    readonly rtcpAddr: string;
    /** Returns the last received signal level. */
    readonly rxLevel: number;
    /** Returns the last transmitted signal level. */
    readonly txLevel: number;
}
/**
 * @see {@link http://www.pjsip.org/pjsip/docs/html/classpj_1_1AudioMediaPlayer.htm|AudioMediaPlayer}
 */
export declare class AudioMediaPlayer extends AudioMedia {
}
/**
 * @see {@link http://www.pjsip.org/pjsip/docs/html/classpj_1_1AudioMediaRecorder.htm|AudioMediaRecorder}
 */
export declare class AudioMediaRecorder extends AudioMedia {
}
export interface Version {
    major: number;
    minor: number;
    rev: number;
    suffix: string;
    full: string;
    numeric: number;
}
export declare class Sipster {
    private static _instance;
    /**
     * @throws {Error}  the instance already exists
     * @throws {Error}  no config specified
     */
    static instance(config?: EpConfig): Sipster;
    protected constructor(config: EpConfig);
    static readonly version: Version;
    readonly Transport: any;
    readonly Account: any;
    readonly config: EpConfig;
    readonly state: string;
    readonly mediaActivePorts: number;
    readonly mediaMaxPorts: number;
    start(): void;
    createPlayer(filename: string, options?: number): AudioMediaPlayer;
    createRecorder(filename: string): AudioMediaRecorder;
}
