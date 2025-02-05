PGDMP                          {            bootcamp_channel    14.4    14.4 9    =           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            >           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ?           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            @           1262    119561    bootcamp_channel    DATABASE     u   CREATE DATABASE bootcamp_channel WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United Kingdom.1252';
     DROP DATABASE bootcamp_channel;
                postgres    false                        2615    119562    bootcamp    SCHEMA        CREATE SCHEMA bootcamp;
    DROP SCHEMA bootcamp;
                postgres    false            D           1247    119574    item_status    TYPE     y   CREATE TYPE bootcamp.item_status AS ENUM (
    'pending',
    'active',
    'passive',
    'rejected',
    'canceled'
);
     DROP TYPE bootcamp.item_status;
       bootcamp          postgres    false    3            G           1247    119586 	   like_type    TYPE     F   CREATE TYPE bootcamp.like_type AS ENUM (
    'like',
    'dislike'
);
    DROP TYPE bootcamp.like_type;
       bootcamp          postgres    false    3            A           1247    119564 	   user_type    TYPE     f   CREATE TYPE bootcamp.user_type AS ENUM (
    'superadmin',
    'admin',
    'user',
    'vip_user'
);
    DROP TYPE bootcamp.user_type;
       bootcamp          postgres    false    3            �            1259    119603    category    TABLE     �   CREATE TABLE bootcamp.category (
    id bigint NOT NULL,
    name_tm text,
    name_en text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);
    DROP TABLE bootcamp.category;
       bootcamp         heap    postgres    false    3            �            1259    119602    category_id_seq    SEQUENCE     z   CREATE SEQUENCE bootcamp.category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE bootcamp.category_id_seq;
       bootcamp          postgres    false    212    3            A           0    0    category_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE bootcamp.category_id_seq OWNED BY bootcamp.category.id;
          bootcamp          postgres    false    211            �            1259    119670    comments    TABLE     9  CREATE TABLE bootcamp.comments (
    id bigint NOT NULL,
    comment_text text NOT NULL,
    user_id bigint NOT NULL,
    video_id bigint NOT NULL,
    is_deleted boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);
    DROP TABLE bootcamp.comments;
       bootcamp         heap    postgres    false    3            �            1259    119669    comments_id_seq    SEQUENCE     z   CREATE SEQUENCE bootcamp.comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE bootcamp.comments_id_seq;
       bootcamp          postgres    false    220    3            B           0    0    comments_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE bootcamp.comments_id_seq OWNED BY bootcamp.comments.id;
          bootcamp          postgres    false    219            �            1259    119651    likes    TABLE     	  CREATE TABLE bootcamp.likes (
    id bigint NOT NULL,
    like_type bootcamp.like_type,
    user_id bigint NOT NULL,
    video_id bigint NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);
    DROP TABLE bootcamp.likes;
       bootcamp         heap    postgres    false    3    839            �            1259    119650    likes_id_seq    SEQUENCE     w   CREATE SEQUENCE bootcamp.likes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE bootcamp.likes_id_seq;
       bootcamp          postgres    false    218    3            C           0    0    likes_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE bootcamp.likes_id_seq OWNED BY bootcamp.likes.id;
          bootcamp          postgres    false    217            �            1259    119635    tags    TABLE     �   CREATE TABLE bootcamp.tags (
    id bigint NOT NULL,
    tag_text text NOT NULL,
    video_id bigint NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);
    DROP TABLE bootcamp.tags;
       bootcamp         heap    postgres    false    3            �            1259    119634    tags_id_seq    SEQUENCE     v   CREATE SEQUENCE bootcamp.tags_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE bootcamp.tags_id_seq;
       bootcamp          postgres    false    3    216            D           0    0    tags_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE bootcamp.tags_id_seq OWNED BY bootcamp.tags.id;
          bootcamp          postgres    false    215            �            1259    119592    users    TABLE     �  CREATE TABLE bootcamp.users (
    id bigint NOT NULL,
    fullname text,
    username text NOT NULL,
    password text NOT NULL,
    user_type bootcamp.user_type,
    image text,
    email text,
    phone_number text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    status bootcamp.item_status,
    validation_key text
);
    DROP TABLE bootcamp.users;
       bootcamp         heap    postgres    false    836    833    3            �            1259    119591    users_id_seq    SEQUENCE     w   CREATE SEQUENCE bootcamp.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE bootcamp.users_id_seq;
       bootcamp          postgres    false    210    3            E           0    0    users_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE bootcamp.users_id_seq OWNED BY bootcamp.users.id;
          bootcamp          postgres    false    209            �            1259    119614    videos    TABLE     X  CREATE TABLE bootcamp.videos (
    id bigint NOT NULL,
    title text,
    description text,
    poster text,
    uuid text,
    video_url text,
    user_id bigint NOT NULL,
    category_id bigint NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    duration text
);
    DROP TABLE bootcamp.videos;
       bootcamp         heap    postgres    false    3            �            1259    119613    videos_id_seq    SEQUENCE     x   CREATE SEQUENCE bootcamp.videos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE bootcamp.videos_id_seq;
       bootcamp          postgres    false    3    214            F           0    0    videos_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE bootcamp.videos_id_seq OWNED BY bootcamp.videos.id;
          bootcamp          postgres    false    213            �           2604    119606    category id    DEFAULT     n   ALTER TABLE ONLY bootcamp.category ALTER COLUMN id SET DEFAULT nextval('bootcamp.category_id_seq'::regclass);
 <   ALTER TABLE bootcamp.category ALTER COLUMN id DROP DEFAULT;
       bootcamp          postgres    false    211    212    212            �           2604    119673    comments id    DEFAULT     n   ALTER TABLE ONLY bootcamp.comments ALTER COLUMN id SET DEFAULT nextval('bootcamp.comments_id_seq'::regclass);
 <   ALTER TABLE bootcamp.comments ALTER COLUMN id DROP DEFAULT;
       bootcamp          postgres    false    220    219    220            �           2604    119654    likes id    DEFAULT     h   ALTER TABLE ONLY bootcamp.likes ALTER COLUMN id SET DEFAULT nextval('bootcamp.likes_id_seq'::regclass);
 9   ALTER TABLE bootcamp.likes ALTER COLUMN id DROP DEFAULT;
       bootcamp          postgres    false    217    218    218            �           2604    119638    tags id    DEFAULT     f   ALTER TABLE ONLY bootcamp.tags ALTER COLUMN id SET DEFAULT nextval('bootcamp.tags_id_seq'::regclass);
 8   ALTER TABLE bootcamp.tags ALTER COLUMN id DROP DEFAULT;
       bootcamp          postgres    false    216    215    216            ~           2604    119595    users id    DEFAULT     h   ALTER TABLE ONLY bootcamp.users ALTER COLUMN id SET DEFAULT nextval('bootcamp.users_id_seq'::regclass);
 9   ALTER TABLE bootcamp.users ALTER COLUMN id DROP DEFAULT;
       bootcamp          postgres    false    210    209    210            �           2604    119617 	   videos id    DEFAULT     j   ALTER TABLE ONLY bootcamp.videos ALTER COLUMN id SET DEFAULT nextval('bootcamp.videos_id_seq'::regclass);
 :   ALTER TABLE bootcamp.videos ALTER COLUMN id DROP DEFAULT;
       bootcamp          postgres    false    214    213    214            2          0    119603    category 
   TABLE DATA           R   COPY bootcamp.category (id, name_tm, name_en, created_at, updated_at) FROM stdin;
    bootcamp          postgres    false    212   �A       :          0    119670    comments 
   TABLE DATA           m   COPY bootcamp.comments (id, comment_text, user_id, video_id, is_deleted, created_at, updated_at) FROM stdin;
    bootcamp          postgres    false    220   �B       8          0    119651    likes 
   TABLE DATA           [   COPY bootcamp.likes (id, like_type, user_id, video_id, created_at, updated_at) FROM stdin;
    bootcamp          postgres    false    218   �B       6          0    119635    tags 
   TABLE DATA           P   COPY bootcamp.tags (id, tag_text, video_id, created_at, updated_at) FROM stdin;
    bootcamp          postgres    false    216   C       0          0    119592    users 
   TABLE DATA           �   COPY bootcamp.users (id, fullname, username, password, user_type, image, email, phone_number, created_at, updated_at, status, validation_key) FROM stdin;
    bootcamp          postgres    false    210   �C       4          0    119614    videos 
   TABLE DATA           �   COPY bootcamp.videos (id, title, description, poster, uuid, video_url, user_id, category_id, created_at, updated_at, duration) FROM stdin;
    bootcamp          postgres    false    214   �F       G           0    0    category_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('bootcamp.category_id_seq', 9, true);
          bootcamp          postgres    false    211            H           0    0    comments_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('bootcamp.comments_id_seq', 2, true);
          bootcamp          postgres    false    219            I           0    0    likes_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('bootcamp.likes_id_seq', 9, true);
          bootcamp          postgres    false    217            J           0    0    tags_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('bootcamp.tags_id_seq', 5, true);
          bootcamp          postgres    false    215            K           0    0    users_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('bootcamp.users_id_seq', 19, true);
          bootcamp          postgres    false    209            L           0    0    videos_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('bootcamp.videos_id_seq', 4, true);
          bootcamp          postgres    false    213            �           2606    119612    category category_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY bootcamp.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY bootcamp.category DROP CONSTRAINT category_pkey;
       bootcamp            postgres    false    212            �           2606    119680    comments comments_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY bootcamp.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (is_deleted);
 B   ALTER TABLE ONLY bootcamp.comments DROP CONSTRAINT comments_pkey;
       bootcamp            postgres    false    220            �           2606    119658    likes likes_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY bootcamp.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY bootcamp.likes DROP CONSTRAINT likes_pkey;
       bootcamp            postgres    false    218            �           2606    119644    tags tags_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY bootcamp.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY bootcamp.tags DROP CONSTRAINT tags_pkey;
       bootcamp            postgres    false    216            �           2606    119601    users users_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY bootcamp.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY bootcamp.users DROP CONSTRAINT users_pkey;
       bootcamp            postgres    false    210            �           2606    119623    videos videos_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY bootcamp.videos
    ADD CONSTRAINT videos_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY bootcamp.videos DROP CONSTRAINT videos_pkey;
       bootcamp            postgres    false    214            �           2606    119629    videos to_category    FK CONSTRAINT     �   ALTER TABLE ONLY bootcamp.videos
    ADD CONSTRAINT to_category FOREIGN KEY (category_id) REFERENCES bootcamp.category(id) ON DELETE RESTRICT;
 >   ALTER TABLE ONLY bootcamp.videos DROP CONSTRAINT to_category;
       bootcamp          postgres    false    212    214    3220            �           2606    119624    videos to_user    FK CONSTRAINT     �   ALTER TABLE ONLY bootcamp.videos
    ADD CONSTRAINT to_user FOREIGN KEY (user_id) REFERENCES bootcamp.users(id) ON DELETE CASCADE;
 :   ALTER TABLE ONLY bootcamp.videos DROP CONSTRAINT to_user;
       bootcamp          postgres    false    210    3218    214            �           2606    119659    likes to_user    FK CONSTRAINT     �   ALTER TABLE ONLY bootcamp.likes
    ADD CONSTRAINT to_user FOREIGN KEY (user_id) REFERENCES bootcamp.users(id) ON DELETE SET NULL;
 9   ALTER TABLE ONLY bootcamp.likes DROP CONSTRAINT to_user;
       bootcamp          postgres    false    210    3218    218            �           2606    119681    comments to_user    FK CONSTRAINT     �   ALTER TABLE ONLY bootcamp.comments
    ADD CONSTRAINT to_user FOREIGN KEY (user_id) REFERENCES bootcamp.users(id) ON DELETE CASCADE;
 <   ALTER TABLE ONLY bootcamp.comments DROP CONSTRAINT to_user;
       bootcamp          postgres    false    3218    220    210            �           2606    119645    tags to_video    FK CONSTRAINT     �   ALTER TABLE ONLY bootcamp.tags
    ADD CONSTRAINT to_video FOREIGN KEY (video_id) REFERENCES bootcamp.videos(id) ON DELETE CASCADE;
 9   ALTER TABLE ONLY bootcamp.tags DROP CONSTRAINT to_video;
       bootcamp          postgres    false    3222    216    214            �           2606    119664    likes to_video    FK CONSTRAINT     �   ALTER TABLE ONLY bootcamp.likes
    ADD CONSTRAINT to_video FOREIGN KEY (video_id) REFERENCES bootcamp.videos(id) ON DELETE CASCADE;
 :   ALTER TABLE ONLY bootcamp.likes DROP CONSTRAINT to_video;
       bootcamp          postgres    false    3222    218    214            �           2606    119686    comments to_video    FK CONSTRAINT     �   ALTER TABLE ONLY bootcamp.comments
    ADD CONSTRAINT to_video FOREIGN KEY (video_id) REFERENCES bootcamp.videos(id) ON DELETE CASCADE;
 =   ALTER TABLE ONLY bootcamp.comments DROP CONSTRAINT to_video;
       bootcamp          postgres    false    214    3222    220            2   �   x�}̱�0����)|J{�kK7g���b�� ��9�b�Qb:~���u��uwyB7�n�y�i�����P�>
),I(:8�y�vz���3:ZR&�/���v"�X�\�0@Zs�`������FvQX�3�l����ð��Eͪi���@xV���La      :   ]   x�u�1
�0@�99�hHڤ�����ֹ��_pSp~�/0�m=dP8!rL�5$�=&�R?d�Yɪ�I1�t�v<��������/�B�x��C      8      x������ � �      6   i   x���1
�0F�Y:E�s����N�ܡ��B����ނ���)��k��
�)�ZCZVk�uBJg��70k٫>!.���u���?�FA �W0!~ff�~1�      0   a  x���]o�X���W���M���^��Z[�j�I&�(*� X��mm��4�i ț�<�Z�Y��F'�\�-��v��/��w����9V�;U֟�7ʛ�L;�[��h�A2Q�a4�7��VY���,t�꣩ ���Ht��6��R�p�	e\XbbCjc��&�Mȁ�"򝤃}\���V�ĩ�_�������;�_^�{'��Rw�Ygu����#��0%wF�Pн?v����U,����!R��PI�=#C�I$ Q���N����$�Vئ�Ƕ�Lؾ F��`����K�0�0��zũ�޾�]����|�:jQ8�b ���+�N�n��A	��ky���j�J�*�߲�yQ�ԥl�%Ɣ	BU�! �o���S$�!�A$F0,�R���'k�@�.�oD`��n�&�M�W�v�(\K`�������&uno��s�5d�aY��_�c��hy٪�|�9v��.�>��:s�~�)9��Ң�}���4�#����듑�&�4)�5N�D�D ����_~��S���B�}{2�:�n�q��n�F��6$����٤�v�$���դ�1>~i1F�a��8�T� p��@�HX=��7���<�oT�X��C߹,�^���
�
r��\�Q���;�!�x�{�8ȷ�6�!�����W�=6���{O��2��q�JJ�ጅ6�$��|[*^/�8�#�M���u��ܽ�{�&�����V�H�'�;7��q��З�mT�Y;X�#�g�v ���|+�;dR�&2B6�o�L��#3!
�@2l ���|����T�I���=<JVC��w�z�=�<�v��dב�Fè'��ͬ��a���޹��-���?��/h4�0��:      4   �   x�}NAn�@;�+�@P&�d2����RE!����[i�Q{驲eɎ"[��g�5��6�kF?�}��y]J����;5B͚�A��!cb�3O�8L�(���D�ޯ����B�-�J8���!Sy��"��D7��G�����"�e./����_o?7����P�b�C颵J���;!v���[[��7�A     