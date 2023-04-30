import { IMAGE_BASE_URL } from "../core/constant.mjs";
import { generateUUID } from "../core/utils.mjs";

export const addUserQuery = `
INSERT INTO bootcamp.users(
	fullname, username, password, user_type, image, email, phone_number, status, validation_key)
	VALUES ($1,$2, $3, $4, '', $5, $6, 'pending', $7) RETURNING *;
`;

export const validateEmailQuery = `
    UPDATE bootcamp.users SET status = 'active', validation_key='',updated_at='now()' WHERE validation_key = $1  RETURNING *;
`;

export const loginQuery = `
SELECT * FROM bootcamp.users WHERE username=$1 AND status='active' ORDER BY created_at DESC LIMIT 1;
`;

export const updateUserImageQuery = `
    UPDATE bootcamp.users SET image = $1,updated_at='now()' WHERE id = $2  RETURNING *;
`;

export const getProfileQuery = `
SELECT *,'${IMAGE_BASE_URL}/public/user-image/' || image AS image FROM bootcamp.users WHERE id=$1;
`;

export const addCategoryQuery = `
INSERT INTO bootcamp.category(
	name_tm, name_en)
	VALUES ($1, $2) RETURNING *;
`;

export const updateCategoryQuery = `
UPDATE bootcamp.category
	SET name_tm=$1, name_en=$2, updated_at='now()'
	WHERE id=$3 RETURNING *;
`;

export const deleteCategoryQuery = `
DELETE FROM bootcamp.category WHERE id=$1;
`;

export const getAllCategoryQuery = `
SELECT * FROM bootcamp.category ORDER BY created_at DESC;
`;

export const addVideoQuery = `
INSERT INTO bootcamp.videos(
	title, description, poster, uuid, video_url, user_id, category_id, duration)
	VALUES ($1, $2, $3, '${generateUUID()}', $4, $5, $6,$7) RETURNING *;
`;

export const getAllVideosQuery = `
SELECT v.*,
'${IMAGE_BASE_URL}/public/video/' || v.poster AS poster,
'${IMAGE_BASE_URL}/public/video/' || v.video_url AS video_url,
(SELECT COUNT(l.id) FROM bootcamp.likes l WHERE l.video_id = v.id AND l.like_type='like')  AS like_count,
(SELECT COUNT(l.id) FROM bootcamp.likes l WHERE l.video_id = v.id AND l.like_type='dislike')  AS dislike_count,
(SELECT array_to_json(array_agg(t.*)) FROM bootcamp.tags t WHERE t.video_id=v.id) AS tags
FROM bootcamp.videos v ORDER BY v.created_at DESC;
`;

export const viewVideoQuery = `
SELECT v.*,
'${IMAGE_BASE_URL}/public/video/' || v.poster AS poster,
'${IMAGE_BASE_URL}/public/video/' || v.video_url AS video_url,
(SELECT COUNT(l.id) FROM bootcamp.likes l WHERE l.video_id = v.id AND l.like_type='like')  AS like_count,
(SELECT COUNT(l.id) FROM bootcamp.likes l WHERE l.video_id = v.id AND l.like_type='dislike')  AS dislike_count,
(SELECT array_to_json(array_agg(t.*)) FROM bootcamp.tags t WHERE t.video_id=v.id) AS tags,
c.name_tm AS category_name_tm,
c.name_en AS category_name_en
FROM bootcamp.videos v 
LEFT JOIN bootcamp.category c ON v.category_id = c.id
WHERE v.id = $1
ORDER BY v.created_at DESC;
`;

export const getVideoCommentsQuery = `
SELECT c.*,u.fullname,'${IMAGE_BASE_URL}/public/user-image/' || u.image AS image
FROM bootcamp.comments c 
LEFT JOIN bootcamp.users u ON u.id = c.user_id
WHERE c.video_id = $1 ORDER BY c.created_at DESC;
`;

export const searchVideoQuery = `
SELECT v.*,
'${IMAGE_BASE_URL}/public/video/' || v.poster AS poster,
'${IMAGE_BASE_URL}/public/video/' || v.video_url AS video_url,
(SELECT COUNT(l.id) FROM bootcamp.likes l WHERE l.video_id = v.id AND l.like_type='like')  AS like_count,
(SELECT COUNT(l.id) FROM bootcamp.likes l WHERE l.video_id = v.id AND l.like_type='dislike')  AS dislike_count,
(SELECT array_to_json(array_agg(t.*)) FROM bootcamp.tags t WHERE t.video_id=v.id) AS tags,
c.name_tm AS category_name_tm,
c.name_en AS category_name_en
FROM bootcamp.videos v
LEFT JOIN bootcamp.category c ON v.category_id = c.id
WHERE v.title ILIKE '%' || $1 || '%'
OR v.description ILIKE '%' || $1 || '%'
OR c.name_tm ILIKE '%' || $1 || '%'
OR c.name_en ILIKE '%' || $1 || '%'
OR (SELECT string_agg(t.tag_text,',') FROM bootcamp.tags t WHERE t.video_id=v.id) ILIKE '%' || $1 || '%'
ORDER BY v.created_at DESC;
`;

export const updateVideoQuery = `
UPDATE bootcamp.videos
	SET title=$1, description=$2,  category_id=$3,  updated_at='now()'
`;

export const getSingleVideoQuery = `
SELECT v.*
FROM bootcamp.videos v WHERE v.id = $1;
`;

export const deleteVideoQuery = `
DELETE FROM bootcamp.videos WHERE id = $1;
`;

export const addTagsQuery = `
INSERT INTO bootcamp.tags(
	tag_text, video_id)
	VALUES %L RETURNING *;
`;

export const updateTagsQuery = `
UPDATE bootcamp.tags
	SET tag_text=$1, updated_at='now()'
	WHERE id=$2 RETURNING *;
`;

export const deleteTagQuery = `
DELETE FROM bootcamp.tags
	WHERE id=$1;
`;

export const addCommentQuery = `
INSERT INTO bootcamp.comments(
	comment_text, user_id, video_id)
	VALUES ($1,$2,$3) RETURNING *;
`;

export const getSingleCommentQuery = `
SELECT * FROM bootcamp.comments WHERE id=$1;
`;

export const updateCommentQuery = `
UPDATE bootcamp.comments
	SET comment_text=$1,updated_at='now()'
	WHERE id=$2 RETURNING *;
`;

export const deleteCommentQuery = `
UPDATE bootcamp.comments
	SET is_deleted=true,updated_at='now()'
	WHERE id=$1 RETURNING *;
`;

export const deleteReverseLikeQuery = `
DELETE FROM bootcamp.likes
	WHERE video_id=$1 AND user_id=$2;
`;

export const addLikeQuery = `
INSERT INTO bootcamp.likes(
	like_type, user_id, video_id)
	VALUES ($1, $2, $3) RETURNING *;
`;