var dataController = function (controller) {
    let $scope = {};
    window.onload = function () {
        (function () {
            let elements = document.querySelectorAll('[data-bind]')
            elements.forEach(function (element) {
                let propToBind = element.getAttribute('data-bind');
                if (!$scope.hasOwnProperty(propToBind)) {
                    addScopeProp(propToBind);
                }
                let setEvent = function () {
                    $scope[propToBind] = element.value;
                }
                // Multi Browser support
                element.onchange = setEvent;
                element.oninput = setEvent;
                function addScopeProp(prop) {
                        let value;
                        Object.defineProperty($scope, prop, {
                            set: function (newValue) {
                                value = newValue;
                                elements.forEach(function (element) {
                                    if (element.getAttribute('data-bind') === prop) {
                                        if (element.type && (element.type === 'text' ||
                                            element.type === 'textarea')) {
                                            element.value = newValue;
                                        }
                                        else if (!element.type) {
                                            element.innerHTML = newValue;
                                            element.value = newValue;
                                        }
                                    }
                                });
                            },
                            get: function () {
                                return value;
                            },
                            enumerable: true
                        });
                }
            });
        })();
        controller($scope);
    }

}

