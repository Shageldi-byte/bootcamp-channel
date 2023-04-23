import { IMAGE_BASE_URL } from "../core/constant.mjs";

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