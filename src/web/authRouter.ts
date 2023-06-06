/** 
	/web/authRouter.ts - Authentication management router
    Copyright (C) 2023  Ilya Zhukov <ilyazhukov24@gmail.com>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/
import { Router, Request, Response, NextFunction } from "express";
import passport from "passport";

const authRouter = Router();

authRouter.get("/unauth", (_: Request, res: Response) => {
	res.status(401).send("Unauthorized");
});
authRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
	return passport.authenticate("login", {state: "/"})(req, res, next);
});
authRouter.get("/oauth2/login", passport.authenticate("login"), (req: Request, res: Response) => {
	const localRedirectUrl = req.query["state"];
	res.redirect(String(localRedirectUrl));
});

authRouter.get("/logout", async (req: Request, res: Response, next: NextFunction) => {
	if(req.isAuthenticated()) {
		req.logout(function(err: any) {
			if (err) 
				return next(err);
		});
		res.status(200);
	} else {
		res.redirect("/auth");
	}
});

export { authRouter };
