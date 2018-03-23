/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

interface Global {
  dispatchEvent: (event: Event) => void
}
