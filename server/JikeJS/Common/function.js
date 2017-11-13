//版本检测
export function version_compare(version1, version2, operator = null) {

    version1 = (version1 + '').replace(/[v|.]/, "");
    version2 = (version2 + '').replace(/[v|.]/, "");


    switch (operator) {
        case '>': {
            return version1 > version2;
        }
        case '<': {
            return version1 < version2;
        }
        default:
            return version1 == version2;
    }
}

export default {version_compare};