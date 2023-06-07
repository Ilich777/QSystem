import { userRolesConfig } from "../../data/userRoles";

const { accessLevels } = userRolesConfig;
type accessLevel = keyof typeof userRolesConfig.accessLevels;

export const allow = function (accessLevel: accessLevel, callback: any) {
	function checkUserRole(req: any, res: any) {
		const role: accessLevel = req.user.role;
		const accessLevelByInputRole = accessLevels[accessLevel];
		if (!accessLevelByInputRole.includes(role)) {
			res.status(403).send(`Unautorized! IP Address: ${req.ip}`);
			return;
		}

		callback(req, res);
	}

	return checkUserRole;
};

export const isAuth = (req: any, res: any, next: any) => {
	if(req.isAuthenticated()) {
		next();
	} else {
		res.redirect("/auth");
	}
};
