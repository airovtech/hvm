CREATE TABLE hvmAttribute (
	id character varying(20) NOT NULL,
	prjId character varying(20),
	prjName character varying(100),
	prjPicture character varying(50),
	prjDesc character varying(4000),
	sbpPrjId character varying(20),
	sbpPrjName character varying(100),
	valueId character varying(20),
	valueName character varying(100),
	sbpId character varying(20),
	sbpName character varying(100),
	sbpActivityId character varying(20),
	sbpActivityName character varying(100),
	attrType character varying(10),
	attrName character varying(100),
	primary key (id)	
);



INSERT INTO hvmattribute(
            id, prjid, prjname, sbpprjid, sbpprjname, valueid, valuename, 
            sbpid, sbpname, sbpactivityid, sbpactivityname, attrtype, attrname)
    VALUES ('1','pssPrj1','pssPrj1','sbpPrj1','sbpPrj1','value1','value1','sbp1','spb1','sbpAct1','sbpAct1','n','attr1')

INSERT INTO hvmattribute(
            id, prjid, prjname, sbpprjid, sbpprjname, valueid, valuename, 
            sbpid, sbpname, sbpactivityid, sbpactivityname, attrtype, attrname)
    VALUES ('2','pssPrj1','pssPrj1','sbpPrj1','sbpPrj1','value1','value1','sbp2','spb2','sbpAct1','sbpAct1','n','attr2')

INSERT INTO hvmattribute(
            id, prjid, prjname, sbpprjid, sbpprjname, valueid, valuename, 
            sbpid, sbpname, sbpactivityid, sbpactivityname, attrtype, attrname)
    VALUES ('3','pssPrj1','pssPrj1','sbpPrj1','sbpPrj1','value1','value1','sbp3','spb3','sbpAct1','sbpAct1','p','attr6')

INSERT INTO hvmattribute(
            id, prjid, prjname, sbpprjid, sbpprjname, valueid, valuename, 
            sbpid, sbpname, sbpactivityid, sbpactivityname, attrtype, attrname)
    VALUES ('4','pssPrj1','pssPrj1','sbpPrj1','sbpPrj1','value2','value2','sbp4','spb4','sbpAct3','sbpAct3','n','attr1')

INSERT INTO hvmattribute(
            id, prjid, prjname, sbpprjid, sbpprjname, valueid, valuename, 
            sbpid, sbpname, sbpactivityid, sbpactivityname, attrtype, attrname)
    VALUES ('5','pssPrj2','pssPrj2','sbpPrj2','sbpPrj2','value1','value1','sbp1','spb1','sbpAct1','sbpAct1','p','attr4')

INSERT INTO hvmattribute(
            id, prjid, prjname, sbpprjid, sbpprjname, valueid, valuename, 
            sbpid, sbpname, sbpactivityid, sbpactivityname, attrtype, attrname)
    VALUES ('6','pssPrj2','pssPrj2','sbpPrj2','sbpPrj2','value2','value2','sbp1','spb1','sbpAct2','sbpAct2','p','attr1')

INSERT INTO hvmattribute(
            id, prjid, prjname, sbpprjid, sbpprjname, valueid, valuename, 
            sbpid, sbpname, sbpactivityid, sbpactivityname, attrtype, attrname)
    VALUES ('7','pssPrj2','pssPrj2','sbpPrj2','sbpPrj2','value3','value3','sbp1','spb1','sbpAct3','sbpAct3','p','attr2')

INSERT INTO hvmattribute(
            id, prjid, prjname, sbpprjid, sbpprjname, valueid, valuename, 
            sbpid, sbpname, sbpactivityid, sbpactivityname, attrtype, attrname)
    VALUES ('8','pssPrj3','pssPrj3','sbpPrj3','sbpPrj3','value1','value1','sbp1','spb1','sbpAct4','sbpAct4','n','attr6')

INSERT INTO hvmattribute(
            id, prjid, prjname, sbpprjid, sbpprjname, valueid, valuename, 
            sbpid, sbpname, sbpactivityid, sbpactivityname, attrtype, attrname)
    VALUES ('9','pssPrj3','pssPrj3','sbpPrj3','sbpPrj3','value1','value1','sbp1','spb1','sbpAct1','sbpAct1','p','attr1')

INSERT INTO hvmattribute(
            id, prjid, prjname, sbpprjid, sbpprjname, valueid, valuename, 
            sbpid, sbpname, sbpactivityid, sbpactivityname, attrtype, attrname)
    VALUES ('10','pssPrj3','pssPrj3','sbpPrj3','sbpPrj3','value2','value2','sbp2','spb2','sbpAct3','sbpAct3','n','attr3')

INSERT INTO hvmattribute(
            id, prjid, prjname, sbpprjid, sbpprjname, valueid, valuename, 
            sbpid, sbpname, sbpactivityid, sbpactivityname, attrtype, attrname)
    VALUES ('11','pssPrj3','pssPrj3','sbpPrj3','sbpPrj3','value2','value2','sbp3','spb3','sbpAct2','sbpAct2','n','attr1')


