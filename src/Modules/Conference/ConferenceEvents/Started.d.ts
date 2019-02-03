import {ConferenceEvent} from "./Common/ConferenceEvent";
import {EventHandler} from "../../../Common/EventHandler";

declare global {
    export namespace ConferenceEvents {
        export namespace Started {
            /**
             * The event is triggered when the conference has started.
             * I.e., the call of {@link VoxEngine.createConference}
             * triggers the event.
             */
            export interface Event extends ConferenceEvent {}

            export interface Handler extends EventHandler<Event> {}
        }
    }
}
