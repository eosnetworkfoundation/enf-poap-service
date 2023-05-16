--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

-- Started on 2023-05-03 11:45:30 CDT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3603 (class 1262 OID 5)
-- Name: postgres; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = icu LOCALE = 'en_US.UTF-8' ICU_LOCALE = 'en-US';


ALTER DATABASE postgres OWNER TO postgres;

\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3604 (class 0 OID 0)
-- Dependencies: 3603
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 3605 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


-- Completed on 2023-05-03 11:45:30 CDT

--
-- PostgreSQL database dump complete
--

CREATE TABLE public.users (
	id INT,
	first_name VARCHAR(50),
	last_name VARCHAR(50),
	email VARCHAR(50)
);
INSERT INTO public.users (id, first_name, last_name, email) VALUES (1, 'Lothaire', 'Dearing', 'ldearing0@parallels.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (2, 'Levi', 'Lightbown', 'llightbown1@trellian.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (3, 'Shawna', 'Hanks', 'shanks2@hostgator.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (4, 'Patrick', 'Ganniclifft', 'pganniclifft3@devhub.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (5, 'Hadlee', 'Henkmann', 'hhenkmann4@princeton.edu');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (6, 'Rodney', 'Hamson', 'rhamson5@xrea.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (7, 'Sandro', 'Cruickshank', 'scruickshank6@vkontakte.ru');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (8, 'Jess', 'Gilardengo', 'jgilardengo7@yelp.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (9, 'Elicia', 'Maffi', 'emaffi8@geocities.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (10, 'Portia', 'Taverner', 'ptaverner9@msn.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (11, 'Archibald', 'Mellonby', 'amellonbya@dailymotion.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (12, 'Zaccaria', 'Winchcum', 'zwinchcumb@examiner.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (13, 'Shurlocke', 'Tootell', 'stootellc@senate.gov');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (14, 'Benjie', 'Woodhams', 'bwoodhamsd@addtoany.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (15, 'Jobye', 'Camoys', 'jcamoyse@google.pl');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (16, 'Camilla', 'Jowsey', 'cjowseyf@moonfruit.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (17, 'Shea', 'Klinck', 'sklinckg@last.fm');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (18, 'Birdie', 'Brookes', 'bbrookesh@istockphoto.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (19, 'Victoria', 'Brody', 'vbrodyi@google.nl');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (20, 'Jennica', 'Stampe', 'jstampej@networkadvertising.org');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (21, 'Pammie', 'McHenry', 'pmchenryk@youku.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (22, 'Carter', 'Fidgin', 'cfidginl@timesonline.co.uk');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (23, 'Guss', 'Brandi', 'gbrandim@posterous.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (24, 'Bran', 'Girton', 'bgirtonn@merriam-webster.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (25, 'Renee', 'Dobbison', 'rdobbisono@is.gd');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (26, 'Kata', 'Winthrop', 'kwinthropp@vimeo.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (27, 'Laney', 'Rulf', 'lrulfq@canalblog.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (28, 'Tore', 'Marklin', 'tmarklinr@ovh.net');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (29, 'Eddi', 'Da Costa', 'edacostas@newyorker.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (30, 'Amye', 'Connikie', 'aconnikiet@scientificamerican.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (31, 'Ronnica', 'Thowes', 'rthowesu@loc.gov');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (32, 'Hastings', 'Larimer', 'hlarimerv@weebly.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (33, 'Auberta', 'Thurborn', 'athurbornw@boston.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (34, 'Desirae', 'Lobbe', 'dlobbex@youku.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (35, 'Sibley', 'De Cristofalo', 'sdecristofaloy@csmonitor.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (36, 'Lamar', 'Whitecross', 'lwhitecrossz@drupal.org');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (37, 'Osborne', 'Poynter', 'opoynter10@virginia.edu');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (38, 'Cull', 'Birch', 'cbirch11@symantec.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (39, 'Trixie', 'Polley', 'tpolley12@nationalgeographic.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (40, 'Welby', 'Tampling', 'wtampling13@tiny.cc');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (41, 'Magdalene', 'Dary', 'mdary14@naver.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (42, 'Adoree', 'Titterell', 'atitterell15@wired.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (43, 'Nanine', 'MacDearmid', 'nmacdearmid16@over-blog.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (44, 'Beryl', 'Singh', 'bsingh17@hexun.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (45, 'Niels', 'Schooley', 'nschooley18@macromedia.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (46, 'Saundra', 'Jealous', 'sjealous19@studiopress.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (47, 'Pascal', 'Sheircliffe', 'psheircliffe1a@networkadvertising.org');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (48, 'Rycca', 'McKean', 'rmckean1b@adobe.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (49, 'Mitchel', 'Meah', 'mmeah1c@mlb.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (50, 'Merline', 'Hillyatt', 'mhillyatt1d@skyrock.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (51, 'Lawrence', 'Pigny', 'lpigny1e@sohu.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (52, 'Ewell', 'Naldrett', 'enaldrett1f@trellian.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (53, 'Darcy', 'Munton', 'dmunton1g@google.com.hk');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (54, 'Gabi', 'Vasyanin', 'gvasyanin1h@opensource.org');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (55, 'Brose', 'OIlier', 'boilier1i@amazon.co.jp');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (56, 'Abbot', 'Heazel', 'aheazel1j@geocities.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (57, 'Kaleena', 'Stormes', 'kstormes1k@intel.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (58, 'Stephi', 'Potticary', 'spotticary1l@howstuffworks.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (59, 'Rosanne', 'Mapson', 'rmapson1m@dyndns.org');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (60, 'Toinette', 'Nowaczyk', 'tnowaczyk1n@go.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (61, 'Herschel', 'Ledward', 'hledward1o@dedecms.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (62, 'Fonzie', 'Balassa', 'fbalassa1p@vk.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (63, 'Omar', 'Shortt', 'oshortt1q@weather.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (64, 'Jeane', 'Croston', 'jcroston1r@google.de');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (65, 'Silva', 'Dixon', 'sdixon1s@sitemeter.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (66, 'Liliane', 'Curm', 'lcurm1t@webeden.co.uk');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (67, 'Tedman', 'Di Nisco', 'tdinisco1u@nbcnews.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (68, 'Fifi', 'Austen', 'fausten1v@illinois.edu');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (69, 'Mellicent', 'Brookbank', 'mbrookbank1w@geocities.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (70, 'Willie', 'Baggally', 'wbaggally1x@unesco.org');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (71, 'Micheal', 'Mewitt', 'mmewitt1y@examiner.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (72, 'Uta', 'Barrand', 'ubarrand1z@chicagotribune.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (73, 'Annamaria', 'Daughton', 'adaughton20@i2i.jp');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (74, 'Leanor', 'Strettle', 'lstrettle21@aboutads.info');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (75, 'Cristina', 'Houldin', 'chouldin22@taobao.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (76, 'Pandora', 'Adlington', 'padlington23@comcast.net');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (77, 'Caesar', 'Spark', 'cspark24@canalblog.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (78, 'Orv', 'Bragger', 'obragger25@comcast.net');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (79, 'Zachariah', 'Coales', 'zcoales26@topsy.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (80, 'Olwen', 'Joy', 'ojoy27@eepurl.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (81, 'Maggi', 'Locker', 'mlocker28@google.it');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (82, 'Gerard', 'Graundisson', 'ggraundisson29@usda.gov');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (83, 'Art', 'Romi', 'aromi2a@who.int');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (84, 'Ripley', 'Cordoba', 'rcordoba2b@hud.gov');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (85, 'Theresa', 'Abade', 'tabade2c@china.com.cn');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (86, 'Gabrielle', 'Strase', 'gstrase2d@wordpress.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (87, 'Christoffer', 'Currier', 'ccurrier2e@dion.ne.jp');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (88, 'Helyn', 'Maestro', 'hmaestro2f@cisco.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (89, 'Valdemar', 'Marjanovic', 'vmarjanovic2g@ted.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (90, 'Far', 'Adger', 'fadger2h@etsy.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (91, 'Morris', 'Bartelet', 'mbartelet2i@guardian.co.uk');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (92, 'Karlis', 'Jaher', 'kjaher2j@icq.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (93, 'Tildie', 'Esmead', 'tesmead2k@woothemes.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (94, 'Manolo', 'Makey', 'mmakey2l@furl.net');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (95, 'Reynold', 'Huchot', 'rhuchot2m@alibaba.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (96, 'Mitzi', 'Amphlett', 'mamphlett2n@networksolutions.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (97, 'Donal', 'Lovejoy', 'dlovejoy2o@independent.co.uk');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (98, 'Deana', 'Etherington', 'detherington2p@nifty.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (99, 'Elfreda', 'Echalier', 'eechalier2q@wp.com');
INSERT INTO public.users (id, first_name, last_name, email) VALUES (100, 'Ewell', 'Taffarello', 'etaffarello2r@istockphoto.com');
