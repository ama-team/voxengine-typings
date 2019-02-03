export = Conference;

declare global {
    export interface Conference {
        /**
         * Create new endpoint and add it to the specified conference.
         * Important! You can only use this function for a Standalone
         * conference with checked “video conference” option in the
         * rule. Otherwise, you'll receive the
         * {@link ConferenceEvents.ConferenceError} event with code 102.
         * The maximum number of endpoints is 100.
         *
         * @param endpointOptions
         */
        add(endpointOptions: EndpointOptions): Endpoint;

        addEventListener(event: ConferenceEvents.Started, handler: ConferenceEvents.Started.Handler): void;
        addEventListener(event: ConferenceEvents.Stopped, handler: ConferenceEvents.Stopped.Handler): void;
        addEventListener(event: ConferenceEvents.EndpointAdded, handler: ConferenceEvents.EndpointAdded.Handler): void;
        addEventListener(event: ConferenceEvents.EndpointRemoved, handler: ConferenceEvents.EndpointRemoved.Handler): void;
        addEventListener(event: ConferenceEvents.ConferenceError, handler: ConferenceEvents.ConferenceError.Handler): void;

        /**
         * Adds handler for specific event generated by Conference. Use
         * only functions as handlers; anything except a function leads
         * to the error and scenario termination when a handler will be
         * called.
         *
         * @param event Event class (e.g.
         * {@link ConferenceEvents.Stopped}).
         * @param handler Handler function. A single parameter is
         * passed - object with event information.
         */
        addEventListener<E>(event: () => E | any, handler: (event: E) => {}): void;

        /**
         * Get endpoint by the id.
         *
         * @param id Endpoint id.
         */
        get(id: string): Endpoint;

        /**
         * Get endpoint list for current conference.
         */
        getList(): Endpoint[];

        removeEventListener(event: ConferenceEvents.Started, handler?: ConferenceEvents.Started.Handler): void;
        removeEventListener(event: ConferenceEvents.Stopped, handler?: ConferenceEvents.Stopped.Handler): void;
        removeEventListener(event: ConferenceEvents.EndpointAdded, handler?: ConferenceEvents.EndpointAdded.Handler): void;
        removeEventListener(event: ConferenceEvents.EndpointRemoved, handler?: ConferenceEvents.EndpointRemoved.Handler): void;
        removeEventListener(event: ConferenceEvents.ConferenceError, handler?: ConferenceEvents.ConferenceError.Handler): void;

        /**
         * Removes handler for specific event generated by
         * {@link Conference}.
         *
         * @param event Event class (e.g.
         * {@link ConferenceEvents.Stopped}).
         * @param handler Handler function. If not specified, all event
         * listeners are removed.
         */
        removeEventListener<E>(event: () => E | any, handler?: (event: E) => {}): void;

        /**
         * Start sending media (voice and video) from this conference to
         * media unit specified in targetMediaUnit.
         *
         * @param targetMediaUnit Media unit that will receive media.
         */
        sendMediaTo(targetMediaUnit: Call | Conference): void;

        /**
         * Stop the conference. Triggers the
         * {@link ConferenceEvents.Stopped} event.
         */
        stop(): void;

        /**
         * Stop sending media (voice and video) from this conference to
         * media unit specified in targetMediaUnit.
         *
         * @param targetMediaUnit Media unit that will not receive media
         * from this conference anymore.
         */
        stopMediaTo(targetMediaUnit: Call | Conference);
    }
}
