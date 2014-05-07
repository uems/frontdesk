angular
  .module('fd.config', [ 'fd' ])
  .constant('GatewayHost', 'http://localhost:2000')
  .constant('DefaultPrinter', '1')
  .constant('AllPrinters', ['1','2']);
