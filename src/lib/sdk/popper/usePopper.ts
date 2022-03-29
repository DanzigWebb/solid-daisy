import { Accessor, createEffect, createSignal, onCleanup } from 'solid-js';
import { createPopper, Instance, Options } from '@popperjs/core';

export const usePopper = (
    referenceAccessor: Accessor<HTMLElement | undefined | null>,
    popperAccessor: Accessor<HTMLElement | undefined | null>,
    options: Partial<Options> = {}
): () => Instance | undefined => {
    const [instance, setInstance] = createSignal<Instance | undefined>();

    createEffect(() => {
        setInstance(undefined);

        const reference = referenceAccessor();
        const popper = popperAccessor();

        if (reference && popper) {
            const instance = createPopper(reference, popper, options);

            setInstance(instance);

            /*
            * Destroy popper
            */
            onCleanup(() => {
                instance.destroy();
            });
        }
    });

    return () => instance();
}