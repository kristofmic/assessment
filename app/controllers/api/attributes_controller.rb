class Api::AttributesController < ApiController

  def fetch
    api_success(data: attributes)
  end

  def update
    api_success(message: 'Success')
  end

  def delete
    api_success(message: 'Success')
  end

  private
  def attributes
    return [{"attId" => 1426,"attTypeId" => 1314,"attDesc" => "No","listItem" => "Policy_Documented_No"},{"attId" => 1427,"attTypeId" => 1314,"attDesc" => "Yes","listItem" => "Policy_Documented_Yes"},{"attId" => 1428,"attTypeId" => 1315,"attDesc" => "No","listItem" => "Procedure_Documented_No"},{"attId" => 1429,"attTypeId" => 1315,"attDesc" => "Yes","listItem" => "Procedure_Documented_Yes"},{"attId" => 1430,"attTypeId" => 1316,"attDesc" => "No","listItem" => "Implemented_Documented_No"},{"attId" => 1431,"attTypeId" => 1316,"attDesc" => "Yes","listItem" => "Implemented_Documented_Yes"},{"attId" => 1432,"attTypeId" => 1317,"attDesc" => "No","listItem" => "Measured_Documented_No"},{"attId" => 1433,"attTypeId" => 1317,"attDesc" => "Yes","listItem" => "Measured_Documented_Yes"},{"attId" => 1434,"attTypeId" => 1318,"attDesc" => "No","listItem" => "Managed_Documented_No"},{"attId" => 1435,"attTypeId" => 1318,"attDesc" => "Yes","listItem" => "Managed_Documented_Yes"},{"attId" => 1443,"attTypeId" => 1321,"attDesc" => "None","listItem" => "Policy_AppliedScope_None"},{"attId" => 1444,"attTypeId" => 1321,"attDesc" => "Less than half","listItem" => "Policy_AppliedScope_LtHalf"},{"attId" => 1445,"attTypeId" => 1321,"attDesc" => "Half","listItem" => "Policy_AppliedScope_Half"},{"attId" => 1446,"attTypeId" => 1321,"attDesc" => "More than half","listItem" => "Policy_AppliedScope_GtHalf"},{"attId" => 1447,"attTypeId" => 1321,"attDesc" => "All","listItem" => "Policy_AppliedScope_All"},{"attId" => 1448,"attTypeId" => 1322,"attDesc" => "None","listItem" => "Procedure_AppliedScope_None"},{"attId" => 1449,"attTypeId" => 1322,"attDesc" => "Less than half","listItem" => "Procedure_AppliedScope_LtHalf"},{"attId" => 1450,"attTypeId" => 1322,"attDesc" => "Half","listItem" => "Procedure_AppliedScope_Half"},{"attId" => 1451,"attTypeId" => 1322,"attDesc" => "More than half","listItem" => "Procedure_AppliedScope_GtHalf"},{"attId" => 1452,"attTypeId" => 1322,"attDesc" => "All","listItem" => "Procedure_AppliedScope_All"},{"attId" => 1453,"attTypeId" => 1323,"attDesc" => "Operational","listItem" => "Measured_ReviewType_Operationa"},{"attId" => 1454,"attTypeId" => 1323,"attDesc" => "Independent","listItem" => "Measured_ReviewType_Independen"},{"attId" => 1455,"attTypeId" => 1323,"attDesc" => "Metrics","listItem" => "Measured_ReviewType_Metrics"},{"attId" => 1456,"attTypeId" => 1324,"attDesc" => "Operational","listItem" => "Managed_ReviewType_Operational"},{"attId" => 1457,"attTypeId" => 1324,"attDesc" => "Independent","listItem" => "Managed_ReviewType_Independent"},{"attId" => 1458,"attTypeId" => 1324,"attDesc" => "Metrics","listItem" => "Managed_ReviewType_Metrics"},{"attId" => 1448,"attTypeId" => 1325,"attDesc" => "None","listItem" => "Implemented_AppliedScope_None"},{"attId" => 1449,"attTypeId" => 1325,"attDesc" => "Less than half","listItem" => "Implemented_AppliedScope_LtHalf"},{"attId" => 1450,"attTypeId" => 1325,"attDesc" => "Half","listItem" => "Implemented_AppliedScope_Half"},{"attId" => 1451,"attTypeId" => 1325,"attDesc" => "More than half","listItem" => "Implemented_AppliedScope_GtHalf"},{"attId" => 1452,"attTypeId" => 1325,"attDesc" => "All","listItem" => "Implemented_AppliedScope_All"}];
  end

end