import { Missense3DRecord, MissenseVariantRecord } from "./types"

export function useKeyGenerator () {

    let counter = -1

    function returnKey () {
        counter += 1
        return counter
    }

    return returnKey
}

export function getProteinNames (proteinName: string): {name: string, altNames: Array<string>} {

    const altNamePattern = /\(([^)]{2,})\)/g
    const altNames: Array<string> = []
    const name = proteinName.replaceAll(altNamePattern, (match, group) => {
        altNames.push(match)
        return ""
    })

    return {name, altNames}

}

export function getMissense3DPredictions (variantRecord: MissenseVariantRecord, returnAll=false) {

    if (variantRecord.m3d_predictions) {
        if (variantRecord.m3d_predictions.length > 0) {
            if (!returnAll) {
                return variantRecord.m3d_predictions[0]
            } else if (returnAll) {
                return variantRecord.m3d_predictions
            }
        }
    }
}

export function sleep(ms: number) {
    return new Promise((resolve, reject) => {setTimeout(resolve, ms)})
}

export function extractFlaggedFeatures (m3dRecord: Missense3DRecord) {
    const features = {
        ...m3dRecord,
        damaging: undefined,
        created_at: undefined,
        algorithm_version: undefined,
    };
    return Object.entries(features)
        .filter((feature) => {
            const [featureName, isFlagged] = feature;
            if (isFlagged) return true;
        })
        .map((featureName) => featureName[0].replaceAll("_", " "));
};