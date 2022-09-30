--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 14.5

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: individuals; Type: TABLE; Schema: public; Owner: linda
--

CREATE TABLE public.individuals (
    id integer NOT NULL,
    nickname character varying(50) NOT NULL,
    species_id integer,
    seen_on timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    image character varying(1000)
);


ALTER TABLE public.individuals OWNER TO linda;

--
-- Name: individuals_id_seq; Type: SEQUENCE; Schema: public; Owner: linda
--

CREATE SEQUENCE public.individuals_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.individuals_id_seq OWNER TO linda;

--
-- Name: individuals_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: linda
--

ALTER SEQUENCE public.individuals_id_seq OWNED BY public.individuals.id;


--
-- Name: sightings; Type: TABLE; Schema: public; Owner: linda
--

CREATE TABLE public.sightings (
    sighting_id integer NOT NULL,
    date_time timestamp without time zone,
    individual_id integer,
    location character varying(50),
    healthy boolean,
    email character varying(70),
    created_on timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.sightings OWNER TO linda;

--
-- Name: sightings_id_seq; Type: SEQUENCE; Schema: public; Owner: linda
--

CREATE SEQUENCE public.sightings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sightings_id_seq OWNER TO linda;

--
-- Name: sightings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: linda
--

ALTER SEQUENCE public.sightings_id_seq OWNED BY public.sightings.sighting_id;


--
-- Name: species; Type: TABLE; Schema: public; Owner: linda
--

CREATE TABLE public.species (
    id integer NOT NULL,
    common_name character varying(50) NOT NULL,
    scientific_name character varying(70) NOT NULL,
    population integer,
    conservation_status_code character varying(2),
    created_on timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.species OWNER TO linda;

--
-- Name: species_id_seq; Type: SEQUENCE; Schema: public; Owner: linda
--

CREATE SEQUENCE public.species_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.species_id_seq OWNER TO linda;

--
-- Name: species_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: linda
--

ALTER SEQUENCE public.species_id_seq OWNED BY public.species.id;


--
-- Name: individuals id; Type: DEFAULT; Schema: public; Owner: linda
--

ALTER TABLE ONLY public.individuals ALTER COLUMN id SET DEFAULT nextval('public.individuals_id_seq'::regclass);


--
-- Name: sightings sighting_id; Type: DEFAULT; Schema: public; Owner: linda
--

ALTER TABLE ONLY public.sightings ALTER COLUMN sighting_id SET DEFAULT nextval('public.sightings_id_seq'::regclass);


--
-- Name: species id; Type: DEFAULT; Schema: public; Owner: linda
--

ALTER TABLE ONLY public.species ALTER COLUMN id SET DEFAULT nextval('public.species_id_seq'::regclass);


--
-- Data for Name: individuals; Type: TABLE DATA; Schema: public; Owner: linda
--

COPY public.individuals (id, nickname, species_id, seen_on, image) FROM stdin;
1	Mumble	3	2022-01-27 00:00:00-08	https://imgc.allpostersimages.com/img/posters/baby-emperor-penguin_u-L-PZRDOR0.jpg?artHeight=550&artPerspective=n&artWidth=550&background=ffffff
2	Gloria	3	2022-03-02 00:00:00-08	https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/010a163a-59d0-4bf9-9a56-00a6b6c0a0b9/d6094yj-04911599-84b1-4211-bba0-5a0b1772a072.jpg/v1/fill/w_844,h_947,q_70,strp/baby_emperor_penguin_by_laogephoto_d6094yj-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTAwMCIsInBhdGgiOiJcL2ZcLzAxMGExNjNhLTU5ZDAtNGJmOS05YTU2LTAwYTZiNmMwYTBiOVwvZDYwOTR5ai0wNDkxMTU5OS04NGIxLTQyMTEtYmJhMC01YTBiMTc3MmEwNzIuanBnIiwid2lkdGgiOiI8PTg5MSJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.FL5odHeHF0wmkTUhmGvOoO0jvFv4Zi4aFvuDulMbZ4Y
4	Kyle	2	2021-09-25 00:00:00-07	https://wallpapercave.com/wp/wp9178925.jpg
6	Wendy	1	2018-11-13 00:00:00-08	https://media.istockphoto.com/photos/sea-otter-picture-id1195173686?k=20&m=1195173686&s=612x612&w=0&h=yy5yPeFXdOqv8WaTNU1VA2onmcs3FAUMSJPK2Y-XsyM=
5	Wesley	1	2021-07-31 00:00:00-07	https://wallpaperaccess.com/full/1154679.jpg
3	Linda	2	2021-10-20 00:00:00-07	https://i.natgeofe.com/n/de94c416-6d23-45f5-9708-e8d56289268e/naturepl_01132178.jpg?w=636&h=631
12	Lisa	1	2022-09-28 00:00:00-07	https://www.thoughtco.com/thmb/alc033nd4NKfOqtka8PoaG4oHGg=/2119x1414/filters:fill(auto,1)/GettyImages-176608558-81ad368fc1a7438c96c5ee2959758f3c.jpg
13	Joslyn	8	2022-09-28 00:00:00-07	https://static01.nyt.com/images/2021/04/03/multimedia/03xp-april/merlin_185893383_8e41433f-4a32-4b1e-bf02-457290d0d534-superJumbo.jpg
14	Angel	9	2022-09-28 00:00:00-07	https://petapixel.com/assets/uploads/2021/10/babybarnowl-800x533.jpg
15	Alma	10	2022-09-28 00:00:00-07	https://whc.unesco.org/uploads/thumbs/site_0718_0013-750-750-20120627160923.jpg
16	Meia	11	2022-09-28 00:00:00-07	https://www.treehugger.com/thmb/hDeYY5ZZxGFq3JkFl-mVMx1hV3o=/1885x1414/smart/filters:no_upscale()/GettyImages-143795695-df4df0cd96a644d7b8b8327e36eb4935.jpg
\.


--
-- Data for Name: sightings; Type: TABLE DATA; Schema: public; Owner: linda
--

COPY public.sightings (sighting_id, date_time, individual_id, location, healthy, email, created_on) FROM stdin;
1	2021-10-15 00:00:00	6	San Gabriel	t	alpha@gmail.com	2022-09-26 00:00:00-07
2	2019-05-10 00:00:00	4	Valencia	f	gamma@gmail.com	2022-05-10 00:00:00-07
3	2022-03-28 00:00:00	1	North Pole	f	alpha@gmail.com	2022-09-26 00:00:00-07
5	2021-04-01 00:00:00	3	Westwood	f	omega@gmail.com	2021-10-21 00:00:00-07
4	2021-12-28 00:00:00	2	North Pole	t	beta@gmail.com	2022-09-25 00:00:00-07
\.


--
-- Data for Name: species; Type: TABLE DATA; Schema: public; Owner: linda
--

COPY public.species (id, common_name, scientific_name, population, conservation_status_code, created_on) FROM stdin;
2	Axolotl	Ambystoma mexicanum	1000	CE	2021-07-26 00:00:00-07
3	Emperor Penguin	Aptenodytes forsteri	595000	NT	2022-09-25 00:00:00-07
1	Sea otter	Enhydra lutris	9	CE	2022-01-01 00:00:00-08
8	Giraffe	Giraffa	117000	VU	2022-09-28 00:00:00-07
9	Barn Owl	Tyto alba	3600000	LC	2022-09-28 00:00:00-07
10	Okapi	Okapia johnstoni	22000	EN	2022-09-28 00:00:00-07
11	Elephant	Loxodonta	45000	EN	2022-09-28 00:00:00-07
\.


--
-- Name: individuals_id_seq; Type: SEQUENCE SET; Schema: public; Owner: linda
--

SELECT pg_catalog.setval('public.individuals_id_seq', 16, true);


--
-- Name: sightings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: linda
--

SELECT pg_catalog.setval('public.sightings_id_seq', 5, true);


--
-- Name: species_id_seq; Type: SEQUENCE SET; Schema: public; Owner: linda
--

SELECT pg_catalog.setval('public.species_id_seq', 11, true);


--
-- Name: individuals individuals_pkey; Type: CONSTRAINT; Schema: public; Owner: linda
--

ALTER TABLE ONLY public.individuals
    ADD CONSTRAINT individuals_pkey PRIMARY KEY (id);


--
-- Name: sightings sightings_pkey; Type: CONSTRAINT; Schema: public; Owner: linda
--

ALTER TABLE ONLY public.sightings
    ADD CONSTRAINT sightings_pkey PRIMARY KEY (sighting_id);


--
-- Name: species species_pkey; Type: CONSTRAINT; Schema: public; Owner: linda
--

ALTER TABLE ONLY public.species
    ADD CONSTRAINT species_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

