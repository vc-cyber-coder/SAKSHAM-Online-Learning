"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle, Clock, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

// Mock data for a quiz
const quiz = {
  id: 1,
  title: "HTML Fundamentals Quiz",
  description: "Test your knowledge of HTML basics",
  timeLimit: 10, // minutes
  questions: [
    {
      id: 1,
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Hyper Transfer Markup Language",
        "Hyper Text Modern Language",
      ],
      correctAnswer: 0,
    },
    {
      id: 2,
      question: "Which tag is used to create a hyperlink in HTML?",
      options: ["<link>", "<a>", "<href>", "<url>"],
      correctAnswer: 1,
    },
    {
      id: 3,
      question: "Which HTML element is used to define the structure of an HTML document?",
      options: ["<body>", "<head>", "<html>", "<structure>"],
      correctAnswer: 2,
    },
    {
      id: 4,
      question: "Which tag is used to create a numbered list in HTML?",
      options: ["<ul>", "<nl>", "<ol>", "<list>"],
      correctAnswer: 2,
    },
    {
      id: 5,
      question: "Which attribute is used to specify a unique identifier for an HTML element?",
      options: ["class", "id", "name", "unique"],
      correctAnswer: 1,
    },
  ],
}

export default function QuizPage({ params }: { params: { id: string } }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(quiz.questions.length).fill(-1))
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(quiz.timeLimit * 60) // seconds

  const handleAnswerSelect = (answerIndex: number) => {
    const newSelectedAnswers = [...selectedAnswers]
    newSelectedAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newSelectedAnswers)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true)
  }

  // Calculate score
  const calculateScore = () => {
    let correctCount = 0
    selectedAnswers.forEach((answer, index) => {
      if (answer === quiz.questions[index].correctAnswer) {
        correctCount++
      }
    })
    return {
      score: correctCount,
      total: quiz.questions.length,
      percentage: Math.round((correctCount / quiz.questions.length) * 100),
    }
  }

  const score = calculateScore()

  // Format time
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
  }

  return (
    <div className="container max-w-4xl py-12">
      <div className="mb-8 flex items-center justify-between">
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/courses/${params.id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Course
          </Link>
        </Button>
        {!quizSubmitted && (
          <div className="flex items-center text-muted-foreground">
            <Clock className="mr-2 h-4 w-4" />
            Time Remaining: {formatTime(timeRemaining)}
          </div>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{quiz.title}</CardTitle>
          <CardDescription>{quiz.description}</CardDescription>
          {!quizSubmitted && (
            <div className="mt-2">
              <div className="flex justify-between text-sm">
                <span>
                  Question {currentQuestion + 1} of {quiz.questions.length}
                </span>
                <span>{Math.round(((currentQuestion + 1) / quiz.questions.length) * 100)}% Complete</span>
              </div>
              <Progress value={((currentQuestion + 1) / quiz.questions.length) * 100} className="h-2 mt-2" />
            </div>
          )}
        </CardHeader>
        <CardContent>
          {!quizSubmitted ? (
            <div className="space-y-6">
              <div className="text-lg font-medium">{quiz.questions[currentQuestion].question}</div>
              <RadioGroup
                value={selectedAnswers[currentQuestion].toString()}
                onValueChange={(value) => handleAnswerSelect(Number.parseInt(value))}
              >
                {quiz.questions[currentQuestion].options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col items-center justify-center py-6">
                <div className="text-5xl font-bold mb-2">{score.percentage}%</div>
                <div className="text-xl">
                  You scored {score.score} out of {score.total}
                </div>
                <div className="mt-4 text-muted-foreground">
                  {score.percentage >= 70 ? "Great job! You passed the quiz." : "Keep studying and try again."}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Review Your Answers</h3>
                {quiz.questions.map((q, qIndex) => (
                  <div key={qIndex} className="border rounded-md p-4">
                    <div className="flex items-start">
                      <div className="mr-2 mt-0.5">
                        {selectedAnswers[qIndex] === q.correctAnswer ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                      <div className="space-y-2">
                        <div className="font-medium">{q.question}</div>
                        <div className="space-y-1">
                          {q.options.map((option, oIndex) => (
                            <div
                              key={oIndex}
                              className={`p-2 rounded-md ${
                                oIndex === q.correctAnswer
                                  ? "bg-green-100 dark:bg-green-900/20"
                                  : selectedAnswers[qIndex] === oIndex
                                    ? "bg-red-100 dark:bg-red-900/20"
                                    : ""
                              }`}
                            >
                              {option}
                              {oIndex === q.correctAnswer && (
                                <span className="ml-2 text-green-600 dark:text-green-400 text-sm">
                                  (Correct answer)
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {!quizSubmitted ? (
            <>
              <Button variant="outline" onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>
                Previous
              </Button>
              <div className="flex gap-2">
                {currentQuestion === quiz.questions.length - 1 ? (
                  <Button onClick={handleSubmitQuiz}>Submit Quiz</Button>
                ) : (
                  <Button onClick={handleNextQuestion}>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </>
          ) : (
            <div className="flex w-full gap-4">
              <Button variant="outline" asChild className="flex-1">
                <Link href={`/courses/${params.id}/learn`}>Return to Course</Link>
              </Button>
              <Button asChild className="flex-1">
                <Link href={`/courses/${params.id}`}>Continue Learning</Link>
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
