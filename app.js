"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug = require("debug")("egg-passport-weapp");
const assert = require("assert");
const Strategy = require("passport-weapp").Strategy;
function mountOneClient(config, app, client = "weapp") {
    config.passReqToCallback = true;
    assert(config.key, "[egg-passport-weapp] config.passportWeapp.key required");
    assert(config.secret, "[egg-passport-weapp] config.passportWeapp.secret required");
    app.passport.use(client, new Strategy(Object.assign(Object.assign({}, config), { appID: config.key, appSecret: config.secret }), (req, accessToken, refreshToken, profile, expires_in, verified) => {
        console.log("arguments = ", {
            accessToken,
            refreshToken,
            profile,
            expires_in,
            verified
        });
        const user = {
            provider: "weapp",
            id: profile.unionid || profile.openid,
            name: profile.unionid || profile.openid,
            displayName: profile.unionid || profile.openid,
            photo: "",
            gender: profile.gender === "FEMALE"
                ? "female"
                : profile.gender === "MALE"
                    ? "male"
                    : "unknown",
            accessToken,
            refreshToken,
            session_key: profile.session_key,
            profile
        };
        debug("%s %s get user: %j", req.method, req.url, user);
        console.log("do verifying...", app.passport.doVerify);
        app.passport.doVerify(req, user, verified);
    }));
}
exports.default = (app) => {
    const config = app.config.passportWeapp;
    if (config.clients) {
        for (const client in config.clients) {
            const c = config.clients[client];
            mountOneClient(c, app, client);
        }
    }
    else {
        mountOneClient(config, app);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDckQsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2pDLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFFBQVEsQ0FBQztBQUVwRCxTQUFTLGNBQWMsQ0FDckIsTUFBVyxFQUNYLEdBQWdCLEVBQ2hCLFNBQWlCLE9BQU87SUFFeEIsTUFBTSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztJQUVoQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSx3REFBd0QsQ0FBQyxDQUFDO0lBQzdFLE1BQU0sQ0FDSixNQUFNLENBQUMsTUFBTSxFQUNiLDJEQUEyRCxDQUM1RCxDQUFDO0lBRUYsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQ2QsTUFBTSxFQUNOLElBQUksUUFBUSxpQ0FFTCxNQUFNLEtBQ1QsS0FBSyxFQUFFLE1BQU0sQ0FBQyxHQUFHLEVBQ2pCLFNBQVMsRUFBRSxNQUFNLENBQUMsTUFBTSxLQUUxQixDQUNFLEdBQVEsRUFDUixXQUFtQixFQUNuQixZQUFvQixFQUNwQixPQUFZLEVBQ1osVUFBa0IsRUFDbEIsUUFBYSxFQUNiLEVBQUU7UUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRTtZQUMxQixXQUFXO1lBQ1gsWUFBWTtZQUNaLE9BQU87WUFDUCxVQUFVO1lBQ1YsUUFBUTtTQUNULENBQUMsQ0FBQztRQUNILE1BQU0sSUFBSSxHQUFHO1lBQ1gsUUFBUSxFQUFFLE9BQU87WUFDakIsRUFBRSxFQUFFLE9BQU8sQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLE1BQU07WUFDckMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLE1BQU07WUFDdkMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLE1BQU07WUFDOUMsS0FBSyxFQUFFLEVBQUU7WUFDVCxNQUFNLEVBQ0osT0FBTyxDQUFDLE1BQU0sS0FBSyxRQUFRO2dCQUN6QixDQUFDLENBQUMsUUFBUTtnQkFDVixDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBSyxNQUFNO29CQUN6QixDQUFDLENBQUMsTUFBTTtvQkFDUixDQUFDLENBQUMsU0FBUztZQUNqQixXQUFXO1lBQ1gsWUFBWTtZQUNaLFdBQVcsRUFBRSxPQUFPLENBQUMsV0FBVztZQUNoQyxPQUFPO1NBQ1IsQ0FBQztRQUVGLEtBQUssQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFdkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RELEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDN0MsQ0FBQyxDQUNGLENBQ0YsQ0FBQztBQUNKLENBQUM7QUFFRCxrQkFBZSxDQUFDLEdBQWdCLEVBQUUsRUFBRTtJQUNsQyxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQztJQUV4QyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNuQixLQUFLLE1BQU0sTUFBTSxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNwQyxNQUFNLENBQUMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRWpDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2pDLENBQUM7SUFDSCxDQUFDO1NBQU0sQ0FBQztRQUNOLGNBQWMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDOUIsQ0FBQztBQUNILENBQUMsQ0FBQyJ9