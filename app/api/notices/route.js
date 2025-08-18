import { NextResponse } from "next/server";
import { connectToDB } from "../../../lib/connectToDB";
import Notice from "../../../lib/Notice/model";

export async function GET() {
  await connectToDB();
  const project = await Notice.find();
  const response = NextResponse.json(project);
  response.headers.set("Access-Control-Allow-Origin", "*");
  return response;
}

export async function POST(req) {
  try {
    const data = await req.json();

    // Connect to the database
    await connectToDB();
    await Notice.create(data);
    return NextResponse.json(
      { message: "Data created" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating data:", error);
    return NextResponse.json(
      { message: "Failed to create data" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    await connectToDB();
    const deleted = await Notice.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json(
        { message: " data not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: " data deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to delete  data" },
      { status: 500 }
    );
  }
}
