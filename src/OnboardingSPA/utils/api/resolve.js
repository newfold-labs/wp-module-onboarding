export async function resolve(promise) {
    const resolved = {
        body: null,
        error: null
    };

    try {
        resolved.body = await promise;
    } catch (e) {
        resolved.error = e;
    }

    return resolved;
}
