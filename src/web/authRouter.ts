import { Router } from "express";
import passport from "passport";

const authRouter = Router();

authRouter.get("/unauth", (_: any, res: any) => {
	res.status(401).send("Unauthorized");
});
authRouter.get("/", (req: any, res: any, next: any) => {
	return passport.authenticate("login", {state: "/"})(req, res, next);
});
authRouter.get("/oauth2/login", passport.authenticate("login"), (req: any, res: any) => {
	const localRedirectUrl = req.query["state"];
	res.redirect(localRedirectUrl);
});

authRouter.get("/logout", async (req: any, res: any, next: any) => {
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
