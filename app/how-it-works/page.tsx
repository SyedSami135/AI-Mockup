import Start from "@/components/Start";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BrainCircuit, FileText, MessageSquare, UserCheck } from "lucide-react"
import { useRouter } from "next/navigation";

export default function Component() {

  return (
    <div className="bg-background min-h-screen">
      <header className="bg-primary text-primary-foreground py-12 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">How Mock Interview Generator Works</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Prepare for your dream job with our AI-powered mock interview platform. Here's how it works:
        </p>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-card">
            <CardHeader>
              <FileText className="w-12 h-12 text-primary mb-4" />
              <CardTitle>1. Create your Interview</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Start by Creating your Interview. Our AI analyzes your experience and skills to generate tailored interview questions.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader>
              <BrainCircuit className="w-12 h-12 text-primary mb-4" />
              <CardTitle>2. AI Generates Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Based on your resume and chosen job role, our AI creates a set of relevant and challenging interview questions.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader>
              <MessageSquare className="w-12 h-12 text-primary mb-4" />
              <CardTitle>3. Practice Interview</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Engage in a realistic mock interview. Respond to questions verbally or in writing, simulating a real interview experience.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader>
              <UserCheck className="w-12 h-12 text-primary mb-4" />
              <CardTitle>4. Receive Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Get instant AI-powered feedback on your responses, including suggestions for improvement and confidence-building tips.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <section className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to ace your next interview?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of job seekers who have boosted their interview confidence with our Mock Interview Generator.
          </p>
          <div className="flex justify-center gap-4">
           <Start/>
            
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                question: "How accurate are the AI-generated questions?",
                answer:
                  "Our AI is trained on thousands of real interview questions across various industries. It generates highly relevant questions based on your resume and chosen job role, ensuring a realistic interview experience.",
              },
              {
                question: "Can I practice for specific job roles or industries?",
                answer:
                  "Yes! You can select from a wide range of job roles and industries when setting up your mock interview. This ensures that the questions are tailored to your specific career goals.",
              },
              {
                question: "How does the feedback system work?",
                answer:
                  "Our AI analyzes your responses for content, clarity, and relevance. It provides constructive feedback on areas of improvement, suggests better ways to structure your answers, and highlights your strengths.",
              },
              {
                question: "Is my resume data kept confidential?",
                answer:
                  "Absolutely. We take data privacy seriously. Your resume and all interview responses are encrypted and never shared. They are only used to generate personalized questions and feedback for your mock interviews.",
              },
            ].map((faq, index) => (
              <Card key={index} className="bg-card">
                <CardHeader>
                  <CardTitle>{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{faq.answer}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-20 bg-primary text-white p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">Why Choose Our Mock Interview Generator?</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">AI-Powered Personalization</h3>
              <p>Get interview questions tailored to your unique experience and target job role.</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Realistic Simulation</h3>
              <p>Experience interviews that closely mimic real-world scenarios, building your confidence.</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Instant Feedback</h3>
              <p>Receive immediate, actionable feedback to improve your interview performance.</p>
            </div>
          </div>
        </section>
      </main>

     
    </div>
  )
}