"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  section: z.string().min(2, {
    message: "Section must be at least 2 characters.",
  }),
});
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { postData } from "@/actions/api";
import toast from "react-hot-toast";

const AddSection = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      section: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await postData("/api/v1/master/section", values);

      if (res.success) {
        form.reset();
        toast.success("Section added successfully");
      } else {
        toast.error(res.error);
      }
    } catch (error: any) {
      console.error(error);
    }
  }
  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className="text-lg font-semibold md:text-2xl">Add Section</h1>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg"
        x-chunk="dashboard-02-chunk-1"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-1/3 min-w-72"
          >
            <FormField
              control={form.control}
              name="section"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section</FormLabel>
                  <FormControl>
                    <Input placeholder="Section name" {...field} />
                  </FormControl>
                  <FormDescription>
                    Section name is the category or source of the words
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex justify-center">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default AddSection;
