import { Router } from "express";
import passport from "passport";
import { Request, Response, NextFunction } from "express";

const authRouter = Router();

authRouter.get("/unauth", (_: Request, res: Response) => {
	res.status(401).send("Unauthorized");
});
authRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
	return passport.authenticate("login", {state: "/"})(req, res, next);
});
authRouter.get("/oauth2/login", passport.authenticate("login"), (req: Request, res: any) => {
	const localRedirectUrl = req.query["state"];
	res.redirect(localRedirectUrl);
});

authRouter.get("/logout", async (req: any, res: Response, next: NextFunction) => {
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
