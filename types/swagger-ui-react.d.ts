// Needed because of missing types for swagger-ui-react
declare module "swagger-ui-react" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const SwaggerUI: any;
  export default SwaggerUI;
}
