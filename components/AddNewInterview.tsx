"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formSchema } from "@/lib/zodSchemas";
import { model } from "@/utils/GeminiAiModel";
import db from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader, IconMicrophone } from "@tabler/icons-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const AddNewInterview = () => {
  const { user } = useUser();
  const router = useRouter();

  // const [jsonResponse, setJsonResponse] = useState([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobTitle: "",
      jobDescription: "",
      yearsOfExperience: 0,
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    let prompt = `
List 5 Interview Questions for Job Title: "${values.jobTitle}" and Job Description: "${values.jobDescription}" for an Interviewee having experience of ${values.yearsOfExperience} years in this field using this JSON schema:
{
    "type": "array",
    "items": {
      "type": "object",
      "properties": {
        "question": {
          "type": "string",
          "description": "Question for the interviewee"
        }
      },
      "required": ["question"],
      "additionalProperties": false
    }
}
`;

    const result = await model.generateContent(prompt);
    const mockResponse = await result.response.text();
    if (mockResponse) {
      const mockId = await StoreInDB(values, mockResponse);
      if (mockId) {
        router.push(`/dashboard/interview/${mockId[0].mockId}`);
      }
    } else {
      throw new Error("Something went wrong");
    }

    form.reset();
  }

  const StoreInDB = async (
    { jobTitle, jobDescription, yearsOfExperience }: z.infer<typeof formSchema>,
    jsonResponse: any
  ) => {
    try {
      const resp = await db
        .insert(MockInterview)
        .values({
          mockId: uuidv4(),
          createdAt: new Date(),
          jsonMockResp: jsonResponse,
          jobDescription,
          jobPosition: jobTitle,
          jobExperience: yearsOfExperience,
          createdBy: user?.id,
        })
        .returning({ mockId: MockInterview.mockId });
      return resp;
    } catch (error) {
      throw new Error("Something went wrong");
    }
    return null;
  };

  const [openDialog, setOpenDialog] = useState(false);
  return (
    <>
      <div
        onClick={() => setOpenDialog(true)}
        className="border-2 p-10 bg-secondary rounded-md hover:scale-105 transition-all cursor-pointer  hover:shadow-lg"
      >
        <div className="text-center flex flex-col  items-center justify-center gap-2 text-base md:text-lg   text-primary/80 font-medium">
          <div className="bg-primary/10 p-4 rounded-full">
            <IconMicrophone size={36} />
          </div>
          <h1>Add New Interview</h1>
        </div>
      </div>
      <Dialog open={openDialog} onOpenChange={() => setOpenDialog(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-md md:text-lg font-semibold lg:font-bold">
              Tell us more about Your Job Position
            </DialogTitle>
            <DialogDescription>
              Add Details About your Job Position, years of experience, Skills
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                name="jobTitle"
                control={form.control}
                render={({ field }) => (
                  <div className="flex flex-col gap-1">
                    <FormItem>
                      <Label>Job Position/Job Role</Label>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          placeholder="Node Js Developer, React Js Developer, etc"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>
                )}
              />
              <FormField
                name="jobDescription"
                control={form.control}
                render={({ field }) => (
                  <div className="flex flex-col gap-1">
                    <FormItem>
                      <Label>Job Description</Label>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Tell me  about your Job Requirements, Responsibilities and Tech stack like Node Js, React Js, python, etc"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>
                )}
              />

              <FormField
                name="yearsOfExperience"
                control={form.control}
                render={({ field }) => (
                  <div className="flex flex-col gap-1">
                    <FormItem>
                      <Label>Years of Experience</Label>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <Button onClick={() => setOpenDialog(false)} variant={"ghost"}>
                  Cancel
                </Button>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {" "}
                  {form.formState.isSubmitting ? (
                    <>
                      <IconLoader className="animate-spin transition-all duration-1000 mx-2" />
                      Generating
                    </>
                  ) : (
                    "Start Interview"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddNewInterview;
