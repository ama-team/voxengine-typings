import {NamedEvent} from './NamedEvent';
import '../../Call';

export interface CallEvent<N extends string> extends NamedEvent<N> {
    /**
     * Call that triggered the event.
     */
    readonly call: Call;
}
