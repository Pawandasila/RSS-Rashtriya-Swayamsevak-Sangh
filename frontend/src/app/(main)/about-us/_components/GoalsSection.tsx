import React from 'react';
import { Card } from '@/components/ui/card';

interface GoalsSectionProps {
  goals: {
    title: string;
    objectives: string[];
  };
}

const GoalsSection: React.FC<GoalsSectionProps> = ({ goals }) => {
  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-semibold mb-8">
            हमारे लक्ष्य
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            {goals.title}
          </h2>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            हमारे संगठन के मुख्य लक्ष्य और उद्देश्य जो समाज के कल्याण के लिए हैं
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {goals.objectives.map((objective, index) => (
            <Card key={index} className="group p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-background to-muted/30 hover:-translate-y-2">
              <div className="space-y-4 sm:space-y-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-2xl flex items-center justify-center text-lg font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {index + 1}
                </div>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed font-medium">
                  {objective}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GoalsSection;