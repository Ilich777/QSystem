
type UserRoles = {
	roles: typeof roles,
	accessLevels: typeof accessLevels
}

const roles = {
	guest: "guest",
	operator: "operator",
	admin: "admin"
};

const accessLevels = {
	guest: [ roles.guest, roles.operator, roles.admin ],
	operator: [ roles.operator, roles.admin ],
	admin: [ roles.admin ]
};

export const userRolesConfig : UserRoles = {
	roles: roles,
	accessLevels: accessLevels
};
