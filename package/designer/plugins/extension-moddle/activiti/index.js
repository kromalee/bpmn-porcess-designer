/*
 * @author igdianov
 * address https://github.com/igdianov/activiti-bpmn-moddle
 * */

export default {
  __init__: ["ActivitiModdleExtension"],
  ActivitiModdleExtension: ["type", require("./activitiExtension")],
};
