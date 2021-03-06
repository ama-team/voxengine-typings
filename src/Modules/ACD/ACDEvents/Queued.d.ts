import {ACDRequestEvent} from './$Implicit/ACDRequestEvent';
import {EventHandler} from '../../../$Implicit/EventHandler';

declare global {
    export namespace ACDEvents {
        export namespace Queued {
            /**
             * The event is triggered when an {@link ACDRequest} was set
             * into the queue.
             */
            export interface Event extends ACDRequestEvent {}

            export interface Handler extends EventHandler<Event> {}
        }
    }
}
