export interface ContextType {
  req: Request;
  // TODO This needs to be fixed
  res: Response | any;

  clientId: number;
}
