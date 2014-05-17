(function(app){

  app.factory('AssessmentSvc', ['chAjax', function(ajax){
    var requirements = {},
        attributes = {},
        attrMap = {};

    attrMap = {
      1314: {assessmentType: 'Policy', answerType: 'response'},
      1321: {assessmentType: 'Policy', answerType: 'scope'},
      1315: {assessmentType: 'Procedure', answerType: 'response'},
      1322: {assessmentType: 'Procedure', answerType: 'scope'},
      1316: {assessmentType: 'Implemented', answerType: 'response'},
      1325: {assessmentType: 'Implemented', answerType: 'scope'},
      1317: {assessmentType: 'Measured', answerType: 'response'},
      1323: {assessmentType: 'Measured', answerType: 'scope'},
      1318: {assessmentType: 'Managed', answerType: 'response'},
      1324: {assessmentType: 'Managed', answerType: 'scope'}
    };

    return {
      getRequirements: getRequirements,
      getAttributes: getAttributes,
      saveFinding: saveFinding
    };

    function getObjectID() {
      return 'TestObjectId';
    }

    function formatRequirements(reqs, type) {
      _.each(reqs, function(req) {
        req.select = false;
        req.starred = false;
        req.response = {};
        if (type === "Measured" || type === "Managed") {
          req.scope = [];
        } else {
          req.scope = {};
        }
      });

      return reqs;
    }

    function formatAttributes(attrs) {
      return _.groupBy(attrs, function(attr) {
        attr.assessmentType = attrMap[attr.attTypeId].assessmentType;
        attr.answerType = attrMap[attr.attTypeId].answerType;
        return attr.assessmentType;
      });
    }

    function getRequirements(type) {
      if (!requirements[type]) {
        return ajax.fetch('api/requirements', {objectId: getObjectID()})
          .then(function(result) {
           requirements[type] = formatRequirements(result.data, type);
           return requirements[type];
          }
        );
      }
      else {
        return requirements[type];
      }
    }

    function getAttributes(type) {
      if (!attributes[type]) {
        return ajax.fetch('api/attributes', {objectId: getObjectID()})
          .then(function(result) {
            attributes = formatAttributes(result.data);
            return attributes[type];
          }
        );
      }
      else {
        return attributes[type];
      }
    }

    function saveFinding(fID, attrId, attrTypeId, value) {
      if (value) {
        console.log('Saving: objectId-' + getObjectID() + ' fID-' + fID + ' attrId-' + attrId + ' attrTypeId-' + attrTypeId + ' value-' + value);
        ajax.update('api/attributes', {
          objectID: getObjectID(),
          fID: fID,
          attId: attrId,
          attTypeId: attrTypeId,
          value: value
        });
      }
      else {
        console.log('Deleting: objectId-' + getObjectID() + ' fID-' + fID + ' attrId-' + attrId + ' attrTypeId-' + attrTypeId + ' value-' + value);
        ajax.destroy('api/attributes', {
          objectID: getObjectID(),
          fID: fID,
          attId: attrId,
          attTypeId: attrTypeId,
          value: value
        });
      }
    }

  }]);

}(window.ch.assessmentManager));