

    var saver = {};
    saver.saveToParse = function() {
        var self = this;
        var page = new this.Page();
        this.model.objectId = this.currentPageID;
        page.save(this.model, {
          success: function() {
            window.saver.model.objectId = self.currentPageID;
            alert('saved successfully!');
          }
        });
    };
    saver.dupePage = function() {
        var page = new this.Page();
        page.set('name', 'dup of ' + this.model.name);
        page.set('device', this.model.device);
        page.set('popups', this.model.popups);
        page.set('camera', this.model.camera);
        page.set('page', this.model.page);
        page.set('sounds', this.model.sounds);
        page.save(null, {
          success: function(page) {
            alert('Duplicate page created with objectId: ' + page.id);
          },
          error: function(page, error) {
            alert('Failed to create new page, with error code: ' + error.message);
          }
        });
    };
    saver.addNewPage = function() {
        var page = new this.Page();
        var defaultCamera = {'height':'0','initialX':'0','initialY':'0','motionType':'sine','name':'camera','rotateAngle':'100','rotateSpeed':'2000','scale':'1','timeOffset':'100','translate':false,'translateX':'0','translateXSpeed':'5000','translateY':'200','translateYSpeed':'18000','xyRatio':'1','zoomAmount':'0','zoomSpeed':'2000'};
        var defaultPage = {'name':'new','x':'900','y':'1200'};
        page.set('name', 'new');
        page.set('device', 'new');
        page.set('popups', []);
        page.set('camera', defaultCamera);
        page.set('page', defaultPage);

        page.save(null, {
          success: function(page) {
            alert('New page created with objectId: ' + page.id);
          },
          error: function(page, error) {
            alert('Failed to create new page, with error code: ' + error.message);
          }
        });
    };