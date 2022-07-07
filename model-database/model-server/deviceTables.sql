DROP TABLE userInfo if EXISTS userInfo;
DROP TABLE deviceInfo if EXISTS deviceInfo;
DROP TABLE channelInfo if EXISTS channelInfo;
DROP TABLE deviceAmbient if EXISTS deviceAmbient;
DROP TABLE deviceStatus if EXISTS deviceStatus;

CREATE TABLE "userInfo" (
	id	INTEGER NOT NULL UNIQUE,
	username	TEXT NOT NULL UNIQUE,
	password	TEXT NOT NULL,
	realname	TEXT,
	userrole	INTEGER NOT NULL DEFAULT 2,
	department	TEXT,
	updateTime INTEGER,		/*状态更新时间, Unix Time, the number of seconds since 1970-01-01 00:00:00*/
	PRIMARY KEY("id" AUTOINCREMENT)
)

CREATE TABLE deviceInfo (
	id INTEGER NOTNULL PRIMARY KEY AUTOINCREMENT,
	deviceName	TEXT NOT NULL UNIQUE,	/*仪器唯一名称*/
	factory TEXT NOT NULL,	/*仪器厂商*/
	brand TEXT NULL,		/*仪器商标,同一个厂商的不同仪器品牌, ViewDeep2, ViewDeep3*/
	category TEXT NULL,		/*仪器种类, NIR, IR, RAMAN*/
	model TEXT NULL,		/*同一种类型仪器的不同型号: Q2000, Q3000*/
	serialNo TEXT NOT NULL, /*设备序列号*/
	owner TEXT NULL,		/*仪器所所有者*/
	isOnline INTEGER,		/*是否为Online*/
	isSimulate INTEGER,		/*是否为simulate*/
	channels INTEGER,		/*采集通道数量*/	
	currentChannel INTEGER,	/*当前通道*/
	'state' INTEGER,		/*设备当前状态(OK,Idel, Busy, Error,NotFound,unKnown)*/
	stateMessage TEXT NULL, /*当前状态描述*/
	progressPercent INTEGER,	/*扫描进度百分比值*/
	channelIDs TEXT NULL, 	/*设备通道ID列表(以','分割)，设备运行时，从第一个开始顺序循环执行*/
	password TEXT NOT NULL,		/*登录hash Code serialNo + password计算结果*/
	updateTime INTEGER,		/*状态更新时间, Unix Time, the number of seconds since 1970-01-01 00:00:00 */
)

/*光谱通道参数设置*/
CREATE TABLE channelInfo (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	FOREIGN KEY (device_id) REFERENCES deviceInfo(id)	/*通道所属设备的ID*/
	channelIndex INTEGER,			/*通道编号*/
	selected INTEGER DEFAULT 0,		/*是否选中运行*/
	state INTEGER DEFAULT 0,		/*通道当前状态(OK, Error, Unknown)*/
	isReference INTEGER DEFAULT 0,	/*是否为参考通道*/
	parameter TEXT NOTNULL,			/*采集参数设置*/
	spectrumType INTEGER DEFAULT 2,	/*结果光谱类型（吸收谱、透过谱、背景谱等，与SDSpcFileFormat中YAXISTYPE相同）,缺省为2=吸收谱*/
	useGlobalReference INTEGER DEFAULT 0,	/*是否使用全局参考光谱,在本Channel执行之前，会有专门的参考光谱通道采集光谱，并设置到每一个通道中, 本属性适用于将光路扩展器的一路作为参考光谱的情况，有内部参比通道的设备不适用*/
	subtracteSpectrum BLOB NULL,	/*扣除的光谱*/
	modelIds TEXT NULL,				/*分析模型ID列表，','分割*/
	modelAdjustments TEXT NULL,		/*序列化后的模型调整计算公式K-V序列, key=modelID, value=Python numpy的四则运算方法，与模型一起发送给分析服务器*/
	description TEXT NULL			/*描述*/
	updateTime INTEGER,				/*状态更新时间, Unix Time, the number of seconds since 1970-01-01 00:00:00 */
	pathlength INTEGER DEFAULT 10,	/*通道的光程（单位：mm) 默认10mm*/
)

/*设备温度压力等状态,如果状态不变化（改变小于0.1），30分钟更新一次*/
CREATE TABLE deviceAmbient (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	FOREIGN KEY (device_id) REFERENCES deviceInfo(id)	/*所属设备的ID*/
	temperature INTEGER,		/*温度（摄氏度）*100*/
	humidity INTEGER,			/*相对湿度（%）*100*/
	pressure INTEGER,			/*压力(KPa)*100*/
	updateTime INTEGER,			/*状态更新时间, Unix Time, the number of seconds since 1970-01-01 00:00:00 */
)

/*设备状态记录，通道或者状态变化才记录*/
CREATE TABLE deviceStatus (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	FOREIGN KEY (device_id) REFERENCES deviceInfo(id)	/*所属设备的ID*/
	channelIndex INTEGER,		/*通道编号*/
	state INTEGER,				/*设备当前状态(OK,Idel, Busy, Error,NotFound,unKnown)*/
	stateMessage TEXT NULL, 	/*当前状态描述*/
	updateTime INTEGER,			/*状态更新时间, Unix Time, the number of seconds since 1970-01-01 00:00:00 */
)

/*数据字段属性表*/
CREATE TABLE "dbFieldDict" (
	"id"	INTEGER NOT NULL UNIQUE,
	"tableName"	TEXT NOT NULL,		/*数据表名*/
	"fieldName"	TEXT NOT NULL,		/*字段名*/
	"fieldProp"	TEXT NOT NULL,		/*字段属性，是多种k-v属性的json格式*/
	"updateTime"	INTEGER NOT NULL,	/*状态更新时间*/
	PRIMARY KEY("id" AUTOINCREMENT)
);