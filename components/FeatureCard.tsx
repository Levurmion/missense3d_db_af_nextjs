'use client'

interface Missense3DFeature {
    featureName: string;
    featureText: string;
    flagged: boolean
}

export default function FeatureCard ({ featureName, featureText, flagged }: Missense3DFeature) {

    return (
        <div className={`flex h-full w-full text-inherit rounded-md p-2 ${flagged ? 'bg-red-300' : 'bg-green-300'}`}>
            <h1 className="text-inherit">{featureName}</h1>
        </div>
    )
}