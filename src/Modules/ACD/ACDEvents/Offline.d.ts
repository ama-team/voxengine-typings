import {ACDRequestEvent} from './Common/ACDRequestEvent';
import {EventHandler} from '../../../Common/EventHandler';

declare global {
    export namespace ACDEvents {
        export namespace Offline {
            /**
             * The event is triggered if all operators that can handle a
             * request in specified queue are offline. In this case the
             * request is not queued.
             */
            export interface Event extends ACDRequestEvent {}

            export interface Handler extends EventHandler<Event> {}
        }
    }
}
