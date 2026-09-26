import knowledge from "../data/knowledge.json" with { type: "json" };

interface KnowledgeItem {
  category: string;
  question: string;
  answer: string;
}

export function searchKnowledge(query: string, category?: string): KnowledgeItem[] {
  const words = query.toLowerCase().split(/\s+/).filter((word) => word.length > 3);

  return knowledge
    .filter((item) => !category || item.category === category)
    .map((item) => {
      const text = `${item.question} ${item.answer}`.toLowerCase();
      const score = words.filter((word) => text.includes(word)).length;
      return { item, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ item }) => item);
}