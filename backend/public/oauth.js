let tokens, access_token, refresh_token;
const url = new URL(window.location.href);
const cloudHost = 'https://meta.nxvms.com';

const buildOauthUrl = () => {
    const redirectUrl = new URL(`${cloudHost}/authorize`);
    redirectUrl.searchParams.set('redirect_url', window.location.href);
    redirectUrl.searchParams.set('client_id', 'api-tool');
    return redirectUrl.toString();
};

const redirectOauthLogin = (cloudAuthUrl) => {
    window.location.href = cloudAuthUrl;
};

// Optional clean up the url
const cleanupCode = () => {
    url.searchParams.delete('code');
    window.history.pushState({}, undefined, url.toString());
};

// You can use 3rd party libraries like axios
const getWrapper = (url, params) => {
    const requestUrl = new URL(url);
    requestUrl.search = new URLSearchParams(params).toString();
    const options = {
        method: "GET",
        headers: {},
    };
    if (access_token) {
        options.headers['Authorization'] = `Bearer ${access_token}`
    }
    return fetch(requestUrl.toString(), options).then(r => r.json());
};

const systemGetWrapper = (systemToken, url, params) => {
    const requestUrl = new URL(url);
    requestUrl.search = new URLSearchParams(params).toString();
    const options = {
        method: "GET",
        headers: {},
    };
    if (systemToken) {
        options.headers['Authorization'] = `Bearer ${systemToken}`
    }
    return fetch(requestUrl.toString(), options).then(r => r.json());
};

const postWrapper = (url, data) => {
    const options = {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
    };
    return fetch(url, options).then(r => r.json());
};

const getTokensWithCode = (code) => {
    const data = {
        code,
        grant_type: 'authorization_code',
        response_type: 'token'
    };
    return postWrapper(`${cloudHost}/oauth/token/`, data);
};

const getTokenForSystem = (systemId) => {
    const data = {
        refresh_token,
        grant_type: "refresh_token",
        response_type: "token",
        scope: `cloudSystemId=${systemId}`
    };
    return postWrapper(`${cloudHost}/oauth/token/`, data).then((data) => data.access_token);
};

const createButtons = (systems) => {
    const systemsDiv = document.getElementById('systems');
    const dataDiv = document.getElementById('data');
    systems.forEach(({ name, id, version }) => {
        const button = document.createElement('button');
        const cloudRelay = `https://${id}.relay.vmsproxy.com`;
        button.innerText = name;
        button.disabled = !version || parseInt(version[0]) < 5;
        button.onclick = async () => {
            const systemAccessToken = await getTokenForSystem(id);
            const servers = await systemGetWrapper(systemAccessToken, `${cloudRelay}/rest/v1/servers`);
            const cameras = await systemGetWrapper(systemAccessToken, `${cloudRelay}/rest/v1/devices`);
            const resourceTree = servers.reduce((resources, { id, name }) => {
                resources[id] = {
                    name,
                    cameras: []
                };
                return resources;
            }, {});
            cameras.forEach(({ id, name, serverId, status }) => {
                if (serverId in resourceTree) {
                    resourceTree[serverId].cameras.push(`${name} - ${status || 'No status!!'}`);
                }
            });
            dataDiv.innerHTML = `<h2>Resources for ${name}</h2><pre>${JSON.stringify(resourceTree, undefined, 4)}</pre>`;
        };
        systemsDiv.appendChild(button);
    });
};

(async () => {
    const code = url.searchParams.get('code');
    if (!code) {
        return redirectOauthLogin(buildOauthUrl());
    }
    cleanupCode();

    tokens = await getTokensWithCode(code);
    access_token = tokens.access_token;
    refresh_token = tokens.refresh_token;

    const systems = await getWrapper(`${cloudHost}/api/systems/`);
    createButtons(systems);
})();