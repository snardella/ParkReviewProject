
class VoteSerializer {
  static showData = async (park) => {
    
    const getVotes = await park.$relatedQuery("votes")

    const mappedVotes = getVotes.map((vote) => Number(vote.voteTotal))
    if(Array.isArray(mappedVotes)){
      const sumVotes = mappedVotes.reduce((voteAcc, vote) => voteAcc + vote)
      return sumVotes;
    } 
    return "nope"

    
  }
}
export default VoteSerializer;