import './AppEvents';
import './Call';
import './VoxEngine/callSIPParameters';

export = VoxEngine;
export as namespace VoxEngine;

declare namespace VoxEngine {
    function addEventListener(event: AppEvents.CallAlerting, handler: AppEvents.CallAlerting.Handler): void;
    function addEventListener(event: AppEvents.HttpRequest, handler: AppEvents.HttpRequest.Handler): void;
    function addEventListener(event: AppEvents.Started, handler: AppEvents.Started.Handler): void;
    function addEventListener(event: AppEvents.Terminating, handler: AppEvents.Terminating.Handler): void;
    function addEventListener(event: AppEvents.Terminated, handler: AppEvents.Terminated.Handler): void;
    /**
     * Add handler for specific event generated by application in
     * specific state. Use only functions as handlers; anything except a
     * function leads to the error and scenario termination when a
     * handler will be called.
     *
     * @param event One of the {@link AppEvents} (e.g.
     * {@link AppEvents.CallAlerting}).
     * @param handler Handler function. A single parameter is passed -
     * object with event information
     */
    function addEventListener<E>(event: any, handler: (event: E) => void): void;

    /**
     * Make a call to a conference using {@link Conference} module. If
     * there's no such conference, it'll be created in the first
     * method's call. The method is designed to be called in simple
     * incoming scenario, then it could trigger another special scenario
     * which contains logic of the conference. See the details
     * {@link http://voximplant.com/docs/howto/#conferencing|here}. The
     * method can trigger the {@link CallEvents.Failed} event after 60
     * sec, see the details in
     * {@link https://voximplant.com/docs/references/voxengine/|VoxEngine session limits}.
     *
     * @param conferenceId Id of the conference. The parameter has to be
     * the same as a pattern in a rule so the method triggers
     * appropriate rule with conference logic.
     * @param callerId CallerID of the calling user that will be
     * displayed to the called user. Usage of whitespaces is not
     * allowed. Normally it's some phone number that can be used for
     * callback. IMPORTANT: virtual numbers rented from Voximplant can't
     * be used as CallerID, use only real numbers.
     * @param displayName Name of the calling user, that will be
     * displayed to the called user. Normally it's a human-readable
     * version of CallerID, e.g. a person's name.
     * @param headers Optional SIP headers to be passed with call to
     * conference. Custom header names have to begin with the 'X-'
     * prefix. The "X-" headers could be handled by a SIP phone or WEB
     * SDK (e.g. see the {@link http://voximplant.com/docs/references/websdk/enums/events.html#incomingcall|incomingCall} event).
     * Example: `{'X-header':'value'}`.
     */
    function callConference(
        conferenceId: string,
        callerId: string,
        displayName?: string,
        headers?: {[index: string]: string}
    ): Call;

    /**
     * Start outgoing call to the specified PSTN number. Calls more
     * expensive than 20 cents per minute and calls to Africa are
     * blocked by default for security reasons. Please contact us at
     * support@voximplant.com to enable them. The method can trigger
     * the {@link CallEvents.Failed} event after 60 sec, see the details
     * in {@link https://voximplant.com/docs/references/voxengine/|VoxEngine session limits}.
     *
     * @param number PSTN number to start call to in international
     * format (E.164).
     * @param callerId CallerID of the calling user that will be
     * displayed to the called user. Whitespaces are not allowed. A
     * valid phone number that can be used to call back is required.
     * Following phone numbers can be used:
     *
     * - A real phone number that is rented from Voximplant. IMPORTANT:
     * virtual numbers can't be used.
     * - Any phone number that is verified via an automated call from
     * Voximplant and confirmation code.
     * - A phone number from an incoming call to the rented number. It
     * can be retrieved as Caller ID.
     */
    function callPSTN(number: string, callerId: string): Call;

    /**
     * Start outgoing call to the external SIP system or to another user
     * of the same application. Supported codecs are: G711 (u-law and
     * a-law), Opus, ILBC, Speex. The method can trigger the
     * {@link CallEvents.Failed} event after 60 sec, see the details in
     * {@link https://voximplant.com/docs/references/voxengine/|VoxEngine session limits}.
     *
     * @param to
     * @param options
     */
    function callSIP(to: string, options: callSIPParameters): Call;

    /**
     * Start outgoing call to the specified Voximplant user. The
     * JavaScript scenario that uses this method and user being called
     * should be both associated with the same Voximplant application.
     * The method can trigger the {@link CallEvents.Failed} event after
     * 60 sec, see the details in
     * {@link https://voximplant.com/docs/references/voxengine/|VoxEngine session limits}.
     *
     * @param username Name of the Voximplant user to call.
     * @param callerId CallerID of the calling user that will be
     * displayed to the called user. Usage of whitespaces is not
     * allowed. Normally it's some phone number that can be used for
     * callback. IMPORTANT: virtual numbers rented from Voximplant can't
     * be used as CallerID, use only real numbers.
     * @param displayName Name of the calling user, that will be
     * displayed to the called user. Normally it's a human-readable
     * version of CallerID, e.g. a person's name.
     * @param headers Optional SIP headers to be passed with call to
     * conference. Custom header names have to begin with the 'X-'
     * prefix. The "X-" headers could be handled by a SIP phone or WEB
     * SDK (e.g. see the {@link http://voximplant.com/docs/references/websdk/enums/events.html#incomingcall|incomingCall} event).
     * Example: `{'X-header':'value'}`.
     * @param video Specifies if call should have video support. Please
     * note that prices for audio-only and video calls are different!
     * @param scheme Internal information about codecs from the
     * {@link AppEvents.CallAlerting} event.
     */
    function callUser(
        username: string,
        callerId?: string,
        displayName?: string,
        headers?: {[index: string]: string},
        video?: boolean,
        scheme?: object
    ): Call;

    /**
     * Start outgoing call to the specified Voximplant user in
     * peer-to-peer mode. The JavaScript scenario that uses this method
     * and user being called should be both associated with the same
     * Voximplant application. Audio playback and recording will not
     * make any effect. P2P mode is available only for calls between
     * SDKs. The method can trigger the {@link CallEvents.Failed} event
     * after 60 sec, see the details in
     * {@link https://voximplant.com/docs/references/voxengine/|VoxEngine session limits}.
     * IMPORTANT: calling this method makes impossible to use non-P2P
     * mode for a new call and specified incomingCall. So the following
     * methods couldn't be used: {@link Call#say,}
     * {@link Call#sendDigits}, {@link Call#sendMediaTo},
     * {@link Call#stopMediaTo}.
     *
     * @param incomingCall
     * @param username
     * @param callerId
     * @param displayName
     * @param headers Optional SIP headers to be passed with call to
     * conference. Custom header names have to begin with the 'X-'
     * prefix. The "X-" headers could be handled by a SIP phone or WEB
     * SDK (e.g. see the {@link http://voximplant.com/docs/references/websdk/enums/events.html#incomingcall|incomingCall} event).
     * Example: `{'X-header':'value'}`.
     */
    function callUserDirect(
        incomingCall: Call,
        username: string,
        callerId?: string,
        displayName?: string,
        headers?: {[index: string]: string}
    ): Call;

    /**
     * Set or get custom string associated with current JavaScript
     * session. There are two kinds of the customData values: one is for
     * JavaScript session (i.e. VoxEngine object), another is for the
     * particular call (i.e. {@link Call#customData} and
     * {@link https://voximplant.com/docs/references/websdk/classes/client.html#call|WEB SDK parameter of the method}).
     * It's possible to use them at the same time because they are
     * independent entities. Remember that if you receive some value
     * from WEB SDK, it doesn't overwrite the VoxEngine's value. Any of
     * customData's type values can be later obtained from Call History
     * using HTTP API or Control Panel.
     *
     * @param data Custom session data to set. Maximum size is 200
     * bytes.
     */
    function customData(data: string): string;

    /**
     * Adds all default event listeners to pass signaling information
     * between two calls. The source code of the method is available on
     * {@link https://github.com/voximplant/easyprocess|GitHub}.
     *
     * @param call1 Incoming alerting call.
     * @param call2 Newly created outgoing call.
     * @param onEstablishedCallback Function to be called once call is
     * established. Both call1 and call2 are passed to this function as
     * parameters.
     * @param direct If it's true, P2P mode will be enabled. It's false
     * by default.
     */
    function easyProcess(
        call1: Call,
        call2: Call,
        onEstablishedCallback: (call1: Call, call2: Call) => void,
        direct: boolean
    ): void;

    /**
     * Helper function to forward incoming call to PSTN. The method
     * handles numbers only in E.164 format by default. If you need to
     * handle a number in another format, pass additional function (as
     * a parameter) to the method. For more details see the
     * {@link https://voximplant.com/docs/quickstart/8/making-calls-to-regular-phones/|article about this method}.
     * The source code of the method is available on
     * {@link https://github.com/voximplant/easyprocess|GitHub}.
     *
     * @param numberTransformer Optional function used to transform
     * dialed number to international format. This function accepts
     * dialed number and must return phone number in E.164 format.
     * @param onEstablishedCallback Optional function that is invoked
     * after call is established. Both calls (incoming and outgoing) are
     * passed to this function.
     * @param options An object with a number used as callerid that will
     * be displayed to the called user. Example: `{callerid: number}`.
     * Whitespaces are not allowed. A valid phone number that can be
     * used to call back is required. Following phone numbers can be
     * used:
     *
     * - A real phone number that is rented from Voximplant. IMPORTANT:
     * virtual numbers can't be used.
     * - Any phone number that is verified via an automated call from
     * Voximplant and confirmation code.
     * - An incoming call phone number if a cloud JavaScript scenario is
     * started with an incoming call.
     */
    function forwardCallToPSTN(
        numberTransformer?: (number: string) => string,
        onEstablishedCallback?: (incoming: Call, outgoing: Call) => void,
        options?: {callerId: string}
    ): void;

    /**
     * Helper function to forward incoming call to dialed SIP URI. For
     * more details see the
     * {@link https://voximplant.com/docs/quickstart/9/making-calls-to-an-external-sip-system/|article about this method}.
     * The source code of the method is available on {@link https://github.com/voximplant/easyprocess|GitHub}.
     *
     * @param onEstablishedCallback Optional function that is invoked
     * after call is established. Both calls (incoming and outgoing) are
     * passed to this function.
     * @param video Specifies if call should have video support. Please
     * note that price for audio-only and video calls is different!
     */
    function forwardCallToSIP(
        onEstablishedCallback: (incoming: Call, outgoing: Call) => void,
        video: boolean
    ): void;

    /**
     * Helper function to forward incoming call to user of current
     * application. Dialed number is interpreted as username. For more
     * details see the {@link https://voximplant.com/docs/quickstart/7/making-calls-between-users/|article about this method}.
     * The source code of the method is available on
     * {@link https://github.com/voximplant/easyprocess|GitHub}.
     *
     * @param onEstablishedCallback Optional function that is invoked
     * after call is established. Both calls (incoming and outgoing) are
     * passed to this function.
     * @param video Specifies if call should have video support. Please
     * note that price for audio-only and video calls is different!
     */
    function forwardCallToUser(
        onEstablishedCallback: (incoming: Call, outgoing: Call) => void,
        video: boolean
    ): void;

    /**
     * Helper function to forward incoming call to user of current
     * application in P2P mode. Dialed number is interpreted as
     * username. Due to P2P mode, audio playback and recording will not
     * make any effect. For more details see the
     * {@link https://voximplant.com/docs/quickstart/7/making-calls-between-users/|article about making calls between users}.
     * The source code of the method is available on
     * {@link https://github.com/voximplant/easyprocess|GitHub}.
     *
     * @param onEstablishedCallback Optional function that is invoked
     * after call is established. Both calls (incoming and outgoing) are passed to this function.
     */
    function forwardCallToUserDirect(
        onEstablishedCallback: (incoming: Call, outgoing: Call) => void
    ): void;

    /**
     * Helper function to play sound to incoming call. It also
     * terminates a call in three cases:
     *
     * 1. Playback is finished
     * 2. Call failed
     * 3. Call disconnected.
     *
     * @param fileURL URL of audio (mp3) file to play.
     */
    function playSoundAndHangup(fileURL: string): void;

    /**
     * Remove handler for specific event generated by application.
     *
     * @param event One of the {@link AppEvents}
     * (e.g. {@link AppEvents.CallAlerting}).
     * @param handler Handler function. If not specified, all event
     * listeners are removed.
     */
    function removeEventListener(event: AppEvents | any, handler?: Function): void;

    /**
     * Start sending media from mediaUnit1 to mediaUnit2 and vice versa - the method binds two audio/video streams. Is a shortcut for
     *
     * ```
     * mediaUnit1.sendMediaTo(mediaUnit2); mediaUnit2.sendMediaTo(mediaUnit1);
     * ```
     *
     * @param mediaUnit1 First media unit.
     * @param mediaUnit2 Second media unit.
     */
    function sendMediaBetween(
        mediaUnit1: Call|Conference|ASR|Player|IVR|Recorder,
        mediaUnit2: Call|Conference|ASR|Player|IVR|Recorder
    ): void;

    /**
     * Stop sending media from mediaUnit1 to mediaUnit2 and vice versa Is a shortcut for
     *
     * ```
     * mediaUnit1.stopMediaTo(mediaUnit2); mediaUnit2.stopMediaTo(mediaUnit1);
     * ```
     *
     * @param mediaUnit1 First media unit.
     * @param mediaUnit2 Second media unit.
     */
    function stopMediaBetween(
        mediaUnit1: Call|Conference|ASR|Player|IVR|Recorder,
        mediaUnit2: Call|Conference|ASR|Player|IVR|Recorder
    ): void;

    /**
     * Terminates current JavaScript session. All audio/video streams
     * will be disconnected and scenario's execution will also be
     * terminated. Note that after the function call only the
     * {@link AppEvents.Terminating} and {@link AppEvents.Terminated}
     * events will be triggered; other events won't be triggered
     * (e.g. {@link CallEvents.Disconnected}).
     */
    function terminate(): void;
}
