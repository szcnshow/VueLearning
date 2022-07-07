
class PropertyItem {
  // 内部名称
  String InnerName;
  // 中文名称
  String ChineseName,
  // 英文名称
  String EnglishName,
  // 属性类型
  String ValueType,
  // 属性值
  Value: ,
  // 是否有效
  IsValid: Boolean,
  // 是否可输入
  Inputable: Boolean,
  // 选择项
  Selections: String,
  // 是否为列表项
  IsSelection: Boolean,
  // 是否为文件名
  IsFilename: Boolean,
  // 最小值
  MinValue: String,
  // 最大值
  MaxValue: String,
  // 是否需要新行
  NeedNewLine: Boolean,
  // 本属性显示的关联属性名称, 必须是InnerName, 比如: IsSelected. 目前针对Boolean类型和有下拉列表选项的类型
  // NULL表示无条件显示
  VisibleSource: String,
  // 本属性显示的关联属性值，比如:True, 目前针对Boolean类型和有下拉列表选项的类型
  VisibleValue: String,
  // True:设定值与属性值相等是显示, False=设定值与属性值不等时显示,缺省:True
  VisibleEqual: Boolean,
  // 是否为命令按钮，如果是命令按钮，属性页面上会显示按钮
  IsCommandButton: String,
  // 是否为DataGrid数据，如果是，则Value的值为JSon格式的Dictionary，
  IsDataGrid: Boolean,
  // 是否只读，2021-01-15添加，
  IsReadonly: Boolean
}
