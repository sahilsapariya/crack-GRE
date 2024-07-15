"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import * as XLSX from "xlsx";

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

import { getData, postData } from "@/actions/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

const formSchema = z.object({
  section: z.string(),
  words: z.any(),
});

const AddWords = () => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchSections = async () => {
      const res = await getData("/api/v1/master/section");
      console.log(res);
      setSections(res.data);
    };
    fetchSections();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      section: "",
      words: null,
    },
  });

  const handleFileRead = async (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const data = new Uint8Array(event.target.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet);

          // Transform the data
          const transformedData = jsonData.map((item: any) => {
            return {
              word: item.Word,
              meaning: item.Meaning,
              example: item.Example,
              synonyms: item.Synonyms,
            };
          });

          resolve(transformedData);
        } else {
          reject(new Error("File reading error"));
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const wordsFile = values.words[0];
      const wordsData = await handleFileRead(wordsFile);

      var section = values.section;
      const payload = {
        section: section,
        words: wordsData,
      };

      const res = await postData("/api/v1/words", payload);

      if (res.success) {
        toast.success("Words added successfully");
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className="text-lg font-semibold md:text-2xl">Add Words</h1>
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a section" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sections?.map((section, index) => (
                        <SelectItem key={index} value={section}>
                          {section}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="words"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Words</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Select the words file"
                      type="file"
                      onChange={(e) => field.onChange(e.target.files)}
                    />
                  </FormControl>
                  <FormDescription>
                    Please upload a file containing words and meanings.
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

export default AddWords;
