DROP TABLE modelConcents IF EXISTS modelConcents
DROP TABLE modelSpectrum IF EXISTS modelSpectrum
DROP TABLE modelSampleInfo IF EXISTS modelSampleInfo
DROP TABLE modelConcentInfo IF EXISTS modelConcentInfo

/*模型组分信息*/
CREATE TABLE modelConcentInfo (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	name TEXT NOT NULL,
	unit TEXT NOT NULL,		/*浓度单位*/
	description TEXT NULL
);

/*模型样品信息*/
CREATE TABLE modelSampleInfo (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	name TEXT NOT NULL,
	company TEXT NULL,	/*样品的企业*/
	form TEXT NULL,		/*样品形态*/
	description TEXT NULL
);

/*模型光谱*/
CREATE TABLE modelSpectrum(
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	sample_id INTEGER NOT NULL,		/*对应样品信息*/
	name TEXT NOT NULL,			/*光谱名称*/
	data BLOB NOT NULL,			/*光谱数据*/
	batch_no INTEGER NULL,		/*同一个样品不同扫描，标记为一个号码*/
	description TEXT NULL,		/*光谱描述*/
	FOREIGN KEY (sample_id) REFERENCES modelSampleInfo(id)	/*对应的样品信息*/
);

/*模型组分浓度*/
CREATE TABLE modelConcents(
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	spectrum_id INTEGER NOT NULL,		/*对应光谱*/
	concentdict_id INTEGER NOT NULL,		/*对应组分信息*/
	data REAL NOT NULL,				/*组分值*/
	FOREIGN KEY (spectrum_id) REFERENCES modelSpectrum(id),				/*对应的光谱*/
	FOREIGN KEY (concentdict_id) REFERENCES modelConcentInfo(id)		/*对应的组分信息*/
);

