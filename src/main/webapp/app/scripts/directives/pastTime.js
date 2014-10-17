angular.module('activitiApp').directive('aaPast', function () {
    return {
        link: function (scope, element, attrs) {
            scope.$watch(attrs.aaPast, function (value) {
                if(typeof  value == 'undefined' || value==null){
                    element.addClass("hidden");
                    return;
                }
                var dateValue = new Date(value);
                var date = new Date();
                var diff = (dateValue.getTime() - date.getTime()) / 1000;
                if (diff > 72000) {
                    element.removeClass("aaPast, aaCurrent");
                    element.addClass("aaFuture"); //from next day on
                }
                else if (diff > 0 && diff < 72000) {
                    element.removeClass("aaPast, aaFuture");
                    element.addClass("aaCurrent");//in one day
                } else {
                    element.removeClass("aaCurrent, aaFuture");//more then one day from now
                    element.addClass("aaPast");
                }

            });
        }
    };
});