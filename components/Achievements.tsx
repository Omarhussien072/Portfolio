'use client'

interface AchievementProps {
    numberOfAchievement: string,
    achievementTitle: string,
}

function Achievements({numberOfAchievement, achievementTitle }: AchievementProps){
    return (
        <div className="flex justify-center items-center md:items-start lg:items-start flex-col">
            <span className="text-sm lg:text-xl">{`${numberOfAchievement}`}</span>
            <span className="text-[0.8rem] lg:text-[1rem] text-muted-foreground/70">{`${achievementTitle.toUpperCase()}`}</span>
        </div>
    )
}

export default Achievements;