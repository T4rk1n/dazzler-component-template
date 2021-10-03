type AnyDict = {[k: string]: any};

// These props are always present on dazzler components.
type DazzlerProps = {
    identity: string;
    class_name: string;
    style?: object;
    updateAspects: (aspects: AnyDict) => void;
}
