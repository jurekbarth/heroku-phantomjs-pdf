var page = require('webpage').create(),
    system = require('system'),
    address;
if (system.args.length != 2) {
    console.log("Wrong Format");
    phantom.exit(1);
} else {
    address = system.args[1];
    page.viewportSize = { width: 1200, height: 1697 };
    page.paperSize = {
      width: '1200px',
      height: '1697px',
      margin: '0px'
    };
    page.open(address, function (status) {
        if (status !== 'success') {
            console.log('Unable to load the address!');
            phantom.exit(1);
        } else {
            window.setTimeout(function () {
                page.render("./public/rendered.pdf");
                phantom.exit();
            }, 2000);
        }
    });
}
