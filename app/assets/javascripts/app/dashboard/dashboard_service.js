(function(app){
  var
    dependencies;

  dependencies = [
    DashboardSvc
  ];

  app.factory('DashboardSvc', dependencies);

  function DashboardSvc() {
    var
      sectionOrder;

    sectionOrder = {
      policy: 0,
      procedure: 1,
      implemented: 2,
      measured: 3,
      managed: 4
    };

    return {
      getSections: getSections
    };

    function getSections(requirements) {
      return _.map(requirements, mapRequirements);
    }

    function mapRequirements(val, key, obj) {
      return setSectionData(key, setRequirementsData(val));
    }

    function setSectionData(sectionName, requirements) {
      return {
        label: (sectionName.substr(0, 1).toUpperCase() + sectionName.substr(1, sectionName.length)),
        order: sectionOrder[sectionName],
        requirements: requirements
      };
    }

    function setRequirementsData(requirements) {
      return {
        total: requirements.length,
        answers: setAnswerData(requirements)
      };
    }

    function setAnswerData(requirements) {
      var
        answers,
        response,
        scope;

      answers = {
        answered: 0,
        unanswered: 0,
        partiallyAnswered: 0
      }

      answerData = _.each(requirements, function(req) {
        response = !_.isEmpty(req.response);
        scope = !_.isEmpty(req.scope);

        if (response && scope) {
          answers.answered += 1;
        }
        else if (!response && !scope)
        {
          answers.unanswered += 1;
        }
        else {
          answers.partiallyAnswered += 1;
        }
      });

      return answers;
    }
  }

})(window.ch.assessmentManager);