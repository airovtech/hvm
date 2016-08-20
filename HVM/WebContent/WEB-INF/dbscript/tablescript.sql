
CREATE TABLE hvmProject (
	id character varying(100) NOT NULL,
	pssPrjId character varying(100),
	pssPrjName character varying(100),
	pssPrjPicture character varying(50),
	pssPrjDescription character varying(4000),
	sbpPrjId character varying(100),
	sbpPrjName character varying(100),
	createdUser character varying(50),
	lastModifiedUser character varying(50),
	createdDate timestamp,
	lastModifiedDate timestamp,
	primary key (id)	
);
CREATE TABLE hvmAttribute (
	id character varying(100) NOT NULL,
	prjId character varying(100),
	valueId character varying(100),
	valueName character varying(100),
	sbpId character varying(100),
	sbpName character varying(100),
	activityId character varying(100),
	activityName character varying(100),
	attributeType character varying(10),
	attributeName character varying(100),
	primary key (id)	
);


